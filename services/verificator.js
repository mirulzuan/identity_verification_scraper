const { raw } = require('express');
const Verification = require('../models/verification');
const axios = require('axios');

class VerificatorService {
  static async createVerification(identifier) {
    try {
      const verification = await Verification.create({identifier});
      return verification;
    } catch (error) {
      console.error('Error creating verification record:', error);
      throw error;
    }
  }

  static async getFormData() {
    try {
      const response = await axios.get('https://mysprsemak.spr.gov.my/semakan/daftarPemilih', {withCredentials: true});
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

  static async updateCookies(verificationId, cookies) {
    try {
      const verification = await Verification.findByPk(verificationId);
      
      if (!verification) {
        throw new Error('Verification record not found');
      }

      verification.cookies = cookies;
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

  static async verify(identifier) {
    try {
      const verification = await VerificatorService.createVerification(identifier);
      const verificationId = verification.id;
      const formData = await VerificatorService.getFormData();
      const cookies = await VerificatorService.getCookies(formData);    
      await VerificatorService.updateCookies(verificationId, cookies);
      await VerificatorService.updateResult(verificationId, "result");
      return {};
    } catch (error) {
      console.error('Error in verification process:', error);
      throw error;
    }
  }
}

module.exports = VerificatorService;
