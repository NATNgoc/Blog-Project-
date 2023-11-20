const OTPRepository = require('../models/repository/otp.repo')
const Error = require('../core/error.response')
const otpGenerator = require('otp-generator')
const UserRepository = require("../models/repository/user.repo")
const { sendMail } = require('../utils/mailer')
const { encryptString } = require('../utils')

class OTPService {

    static async createNewOTP({ email }) {
        if (await findUserByEmail(email))
            throw new Error.BadRequestError("Email has existed!")
        const OTP = getRandomOTP()
        const hashedOTP = await encryptString(OTP, 10)
        await OTPRepository.createNewOtp(email, hashedOTP)
        sendOTPtoEmail(email, OTP)
    }

    static async getOTPsByEmail(email) {
        return await OTPRepository.findOTPByEmail(email)
    }


}
//--------------------SUB FUNCTION-------------------------
function getRandomOTP() {
    return otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false
    })
}

async function sendOTPtoEmail(email, code) {
    const htmlContent = "<h>Your code là " + code + "</h>"
    const subject = "[NO-REPLY] Mã xác thực đăng ký cho TECHUB"
    return sendMail(email, subject, htmlContent)
}

async function findUserByEmail(email) {
    return await UserRepository.findUser({
        user_email: email
    })
}



module.exports = OTPService

