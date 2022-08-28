const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
})
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  const errors = []

  if (!email) {
    errors.push({ message: 'Email 欄位是必填的！' })
  }
  if (!password) {
    errors.push({ message: 'Password 欄位是必填的！' })
  }
  if (!confirmpassword) {
    errors.push({ message: 'Confirm Password 欄位是必填的！' })
  }

  if (password !== confirmpassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmpassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個Email已經註冊過了。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmpassword
        })
      } else {
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
