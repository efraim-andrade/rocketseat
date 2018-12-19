const { User, Appointment } = require('../models')

class AppointmentsController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    res.redirect('/app/dashboard')
  }

  async listing (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/listing', { provider })
  }
}

module.exports = new AppointmentsController()
