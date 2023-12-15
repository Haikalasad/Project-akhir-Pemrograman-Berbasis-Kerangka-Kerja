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
    connection.query('SELECT kost.id,kost.nama,kost.alamat,kost.jarak,kost.foto,kost.deskripsi,jenis_kost.jenis,kategori_pemesanan.kategori,kost.harga FROM kost JOIN jenis_kost ON jenis_kost.id = kost.id_jenis JOIN kategori_pemesanan ON kategori_pemesanan.id = kost.id_kategori ORDER BY kost.suka DESC', function (err, rows) {
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

router.get('/detail/:id', function (req, res) {
    const kostId = req.params.id;

    const query = `
        SELECT k.*, j.jenis, kp.kategori
        FROM kost k
        JOIN jenis_kost j ON k.id_jenis = j.id
        JOIN kategori_pemesanan kp ON k.id_kategori = kp.id
        WHERE k.id = ?`;

    connection.query(query, [kostId], function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Kost not found',
            });
        }

        const kostDetails = rows[0];

        return res.status(200).json({
            status: true,
            message: 'Kost details',
            data: kostDetails,
        });
    });
});

router.post(
    '/order/:id',
    [
      body('idKost').notEmpty(),
      body('Tanggal_mulai').notEmpty(),
      body('Tanggal_berakhir').notEmpty(),
      body('Total').notEmpty(),
      // Add more validation rules as needed
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }
  
      const { idKost, Tanggal_mulai, Tanggal_berakhir, Total } = req.body;
      const idUser = req.userId;
  
  
      const query = `
        INSERT INTO myorder (idUser, idKost, Tanggal_mulai, Tanggal_berakhir, Total)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      connection.query(query, [idUser, idKost, Tanggal_mulai, Tanggal_berakhir, Total], function (err, result) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
          });
        }
  
        return res.status(201).json({
          status: true,
          message: 'Order created successfully',
          orderId: result.insertId,
        });
      });
    }
  );
  
module.exports = router;
