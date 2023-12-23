const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/database');

/**
 * INDEX ARTIKEL
 */

router.post('/signup', [
  body('nama').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
],  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          status: false,
          message: 'Invalid input data',
          errors: errors.array(),
      });
  }

  let formData = {
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password
}


  connection.query('INSERT INTO users SET ?', formData, function (err, result) {
      if (err) {
          console.error(err);
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          });
      }

      return res.status(200).json({
          status: true,
          message: 'Signup successful',
          user: result[0],
      });
  });
});


router.post('/login', [
    body('email').notEmpty(),
    body('password').notEmpty(),
], async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: 'Invalid input data',
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    const userQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(userQuery, [email], function (err, rows) {
    
    
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
        if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
            });
        }
        const user = rows[0];
        const userId = user.id; // Ambil ID pengguna
        if (password !== user.password) {
            return res.status(401).json({
                status: false,
                message: 'Invalid password',
            });
        }

    
        return res.status(200).json({
            status: true,
            message: 'Login successful',
            user: {
                id : userId
            
            },
        });
    });
});

router.post('/login', [
    body('email').notEmpty(),
    body('password').notEmpty(),
], async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: 'Invalid input data',
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    const userQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(userQuery, [email], function (err, rows) {
    
    
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
        if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
            });
        }
        const user = rows[0];
        const userId = user.id; // Ambil ID pengguna
        if (password !== user.password) {
            return res.status(401).json({
                status: false,
                message: 'Invalid password',
            });
        }

    
        return res.status(200).json({
            status: true,
            message: 'Login successful',
            user: {
                id : userId
            
            },
        });
    });
});

router.get('/all', function (req, res) {
    connection.query('SELECT kost.id,kost.nama,kost.alamat,kost.jarak,kost.foto,kost.deskripsi,jenis_kost.jenis,kategori_pemesanan.kategori,kost.harga FROM kost JOIN jenis_kost ON jenis_kost.id = kost.id_jenis JOIN kategori_pemesanan ON kategori_pemesanan.id = kost.id_kategori ', function (err, rows) {
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
router.get('/orders/:userId', (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({
          status: false,
          message: 'UserId is required.',
        });
      }
  
      // Fetch orders based on userId with JOIN to get kost details
      const query = `
  SELECT 
    myorder.Tanggal_mulai, 
    myorder.Tanggal_berakhir, 
    myorder.Total, 
    myorder.kategori,
    kost.nama, 
    kost.foto, 
    kost.deskripsi, 
    kost.alamat, 
    kost.jarak, 
    kost.Harga,
    kost.suka,
    kost.fasilitas,
    kost.alamat,
    jenis_kost.jenis as jenis
  FROM myorder
  INNER JOIN kost ON myorder.idKost = kost.id
  LEFT JOIN jenis_kost ON kost.id_jenis = jenis_kost.id
  WHERE myorder.idUser = ?;
`;

  
      connection.query(query, [userId], (err, orders) => {
        if (err) {
          console.error('Error fetching orders:', err);
          return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
          });
        }
  
        return res.status(200).json({
          status: true,
          data: orders,
        });
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }
  });
  
  
router.post(
    '/order/:id',
    [
      body('idKost').notEmpty(),
      body('Tanggal_mulai').notEmpty(),
      body('Tanggal_berakhir').notEmpty(),
      body('Total').notEmpty(),
    
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
      const idUser = req.params.id;
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
