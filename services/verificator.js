const axios = require('axios');
const cheerio = require('cheerio');
const Verification = require('../models/verification');

class VerificatorService {
  static async createVerification(identifier) {
    try {
      const verification = await Verification.create({ identifier });
      return verification;
    } catch (error) {
      console.error('Error creating verification record:', error);
      throw error;
    }
  }

  static async getFormData() {
    try {
      const response = await axios.get('https://mysprsemak.spr.gov.my/semakan/daftarPemilih', { withCredentials: true });
      return response;
    } catch (error) {
      console.error('Failed to get form data error:', error);
      throw error;
    }
  }

  static async getCookies(response) {
    try {
      const rawCookies = response.headers['set-cookie'];
      const cookies = {};

      rawCookies.forEach(cookieStr => {
        const [cookiePair] = cookieStr.split(';');
        const [name, value] = cookiePair.split('=');
        cookies[name] = value;
      });

      return cookies;
    } catch (error) {
      console.error('Failed to get cookies error:', error);
      throw error;
    }

  }

  static async updateFormData(verificationId, cookies, token, captchaUrl, encodedCaptcha) {
    try {
      const verification = await Verification.findByPk(verificationId);

      if (!verification) {
        throw new Error('Verification record not found');
      }

      verification.cookies = cookies;
      verification.token = token;
      verification.captchaUrl = captchaUrl;
      verification.encodedCaptcha = encodedCaptcha;
      await verification.save();
      console.log('Cookies updated');
      return verification;
    } catch (error) {
      console.error('Failed to update cookies:', error);
      throw error;
    }
  }

  static async updateResult(verificationId, result) {
    try {
      const verification = await Verification.findByPk(verificationId);

      if (!verification) {
        throw new Error('Verification record not found');
      }

      verification.result = result;
      await verification.save();
      console.log('Result updated');
      return verification;
    } catch (error) {
      console.error('Failed to update result:', error);
      throw error;
    }
  }

  static async encodeCaptcha(cookies, captchaUrl) {
    try {
      const cookieString = Object
        .entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
      const response = await axios.get(captchaUrl, {
        headers: {'Cookie': cookieString},
        responseType: 'arraybuffer'
      });
      const encodedCaptcha = Buffer
        .from(response.data, 'binary')
        .toString('base64');

      return encodedCaptcha;
    } catch (error) {
      console.error('Failed to encode captcha:', error);
      throw error;
    }
  }

  static async startVerification(identifier) {
    try {
      const verification = await VerificatorService.createVerification(identifier);
      const verificationId = verification.id;
      const formData = await VerificatorService.getFormData();
      const cookies = await VerificatorService.getCookies(formData);
      const $ = cheerio.load(formData.data);
      const token = $('input[name="_token"]').val();
      const captchaUrl = $('#formSemak img').first().attr('src');
      const encodedCaptcha = await VerificatorService.encodeCaptcha(cookies, captchaUrl);;
      await VerificatorService.updateFormData(verificationId, cookies, token, captchaUrl, encodedCaptcha);
      return verification;
    } catch (error) {
      console.error('Error in verification process:', error);
      throw error;
    }
  }

  static async verify(verification, captcha) {
    try {
      const { identifier, cookies, token } = verification;
      const cookieString = Object
        .entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
      const response = await axios.post('https://mysprsemak.spr.gov.my/semakan/daftarPemilihPapar', {
        "_token": token,
        "NoKp": identifier,
        "captcha": captcha,
      }, {
        headers: {'Cookie': cookieString},
      });
      const $ = cheerio.load(response.data);
      const result = $('td').filter((i, el) => $(el).text().trim() === 'Nama Penuh').next('td').text().trim();;
      await VerificatorService.updateResult(verification.id, result);
      return verification;
    } catch (error) {
      console.error('Error in verification process:', error);
      throw error;
    }
  }
}

module.exports = VerificatorService;
