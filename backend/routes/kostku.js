const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/database');

/**
 * INDEX ARTIKEL
 */
router.get('/all', function (req, res) {
    connection.query('SELECT * FROM kost ORDER BY id', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Kost',
                data: rows,
            });
        }
    });
});
router.get('/popularKost', function (req, res) {
    connection.query('SELECT kost.id,kost.nama,kost.alamat,kost.jarak,kost.foto,kost.deskripsi,jenis_kost.jenis,kategori_pemesanan.kategori,kategori_pemesanan.harga FROM kost JOIN jenis_kost ON jenis_kost.id = kost.id JOIN kategori_pemesanan ON kategori_pemesanan.id = kost.id_kategori', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Kost',
                data: rows,
            });
        }
    });
});

// /**
//  * STORE ARTIKEL
//  */
// router.post('/store', [
//     body('title').notEmpty(),
//     body('date').notEmpty(),
//     body('image').notEmpty(),
//     body('content').notEmpty(),
// ], (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             errors: errors.array(),
//         });
//     }

//     let formData = {
//         title: req.body.title,
//         date: req.body.date,
//         image: req.body.image,
//         content: req.body.content,
//     };

//     connection.query('INSERT INTO artikel SET ?', formData, function (err, rows) {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             });
//         } else {
//             return res.status(201).json({
//                 status: true,
//                 message: 'Insert Data Successfully',
//                 data: rows[0],
//             });
//         }
//     });
// });

// /**
//  * SHOW ARTIKEL
//  */
// router.get('/(:id)', function (req, res) {
//     let id = req.params.id;

//     connection.query(`SELECT * FROM artikel WHERE id = ${id}`, function (err, rows) {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             });
//         }

//         if (rows.length <= 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'Data Artikel Not Found!',
//             });
//         } else {
//             return res.status(200).json({
//                 status: true,
//                 message: 'Detail Data Artikel',
//                 data: rows[0],
//             });
//         }
//     });
// });

// /**
//  * UPDATE ARTIKEL
//  */
// router.patch('/update/:id', [
//     body('title').notEmpty(),
//     body('date').notEmpty(),
//     body('image').notEmpty(),
//     body('content').notEmpty(),
// ], (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             errors: errors.array(),
//         });
//     }

//     let id = req.params.id;
//     let formData = {
//         title: req.body.title,
//         date: req.body.date,
//         image: req.body.image,
//         content: req.body.content,
//     };

//     connection.query(`UPDATE artikel SET ? WHERE id = ${id}`, formData, function (err, rows) {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             });
//         } else {
//             return res.status(200).json({
//                 status: true,
//                 message: 'Update Data Successfully!',
//             });
//         }
//     });
// });

// /**
//  * DELETE ARTIKEL
//  */
// router.delete('/delete/(:id)', function (req, res) {
//     let id = req.params.id;

//     connection.query(`DELETE FROM artikel WHERE id = ${id}`, function (err, rows) {
//         if (err) {
//             return res.status(500).json({
//                 status: false,
//                 message: 'Internal Server Error',
//             });
//         } else {
//             return res.status(200).json({
//                 status: true,
//                 message: 'Delete Data Successfully!',
//             });
//         }
//     });
// });

module.exports = router;
