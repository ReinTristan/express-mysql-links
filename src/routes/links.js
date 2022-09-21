const { Router } = require('express')
const router = Router()
const pool = require('../database') 
const { isLogedIn } = require('../lib/auth')
router.get('/add', (req, res) => {
    res.render('links/add')
})
router.post('/add', isLogedIn, async (req, res) => {
    const { title, url, description} = req.body
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO links SET ?', [newLink])
    req.flash('success', 'Link saved successfully')
    res.redirect('/links')
})
router.get('/', isLogedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ? ', [req.user.id])

    res.render('links/list', {
        links
    })
})
router.get('/delete/:id', isLogedIn, async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM links WHERE id = ?', [id])
    req.flash('success', 'Link deleted successfully')
    res.redirect('/links')
})
router.get('/edit/:id', isLogedIn, async (req, res) => {
    const { id } = req.params
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    res.render('links/edit', {
        link:links[0]
    })
    console.log(links[0].description)
})
router.post('/edit/:id', isLogedIn, async (req, res) => {
    const { id } = req.params
    const { title, description, url } = req.body
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id])
    req.flash('success', 'Link updated successfully')
    res.redirect('/links')
})

module.exports = router