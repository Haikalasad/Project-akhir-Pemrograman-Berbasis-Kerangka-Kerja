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
], (req, res) => {
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


router.post('/signup/owner', [
  body('nama').notEmpty(),
  body('email').isEmail(),
  body('no_hp').notEmpty(),
  body('alamat').notEmpty(),
  body('password').isLength({ min: 6 }),
], (req, res) => {
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
    no_hp: req.body.no_hp,
    alamat: req.body.alamat,
    password: req.body.password
  }


  connection.query('INSERT INTO owner SET ?', formData, function (err, result) {
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

const token=jwt.sign({id:userId}, "jwtkey")
res.cookie("accsess_token",token, {
  httpOnly: true,
}).status(200).json({ 
  token:token
})
    return res.status(200).json({
      status: true,
      message: 'Login successful',
      user: {
        id: userId

      },
    });
  });
});

router.post('/login/owner', [
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

  const ownerQuery = 'SELECT * FROM owner WHERE email = ?';
  connection.query(ownerQuery, [email], function (err, rows) {


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
    const owner = rows[0];
    const ownerId = owner.id;
    if (password !== owner.password) {
      return res.status(401).json({
        status: false,
        message: 'Invalid password',
      });
    }


    return res.status(200).json({
      status: true,
      message: 'Login successful',
      user: {
        id: ownerId

      },
    });
  });
});

router.get('/all', function (req, res) {
  connection.query('SELECT kost.id,kost.nama,kost.suka,kost.alamat,kost.jarak,kost.foto,kost.deskripsi,jenis_kost.jenis,kategori_pemesanan.kategori,kost.harga FROM kost JOIN jenis_kost ON jenis_kost.id = kost.id_jenis JOIN kategori_pemesanan ON kategori_pemesanan.id = kost.id_kategori ', function (err, rows) {
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

router.get('/all/owner/:id_pemilik', function (req, res) {
  const id_pemilik = req.params.id_pemilik;

  connection.query(
    'SELECT kost.id, kost.nama, kost.alamat,kost.harga, kost.jarak, kost.foto, kost.deskripsi,kost.fasilitas, jenis_kost.jenis, kategori_pemesanan.kategori, kost.harga FROM kost JOIN jenis_kost ON jenis_kost.id = kost.id_jenis JOIN kategori_pemesanan ON kategori_pemesanan.id = kost.id_kategori WHERE kost.id_pemilik = ?',
    [id_pemilik],
    function (err, rows) {
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
    }
  );
});


router.get('/filter/:kategori', function (req, res) {
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


    const query = `
      SELECT 
        myorder.Tanggal_mulai, 
        myorder.Tanggal_berakhir, 
        myorder.Total, 
        status_pesanan.status as status_pesanan,
        myorder.kategori,
        kost.nama, 
        kost.foto, 
        kost.deskripsi, 
        kost.alamat, 
        kost.jarak, 
        kost.harga,
        kost.suka,
        kost.fasilitas,
        kost.alamat,
        jenis_kost.jenis as jenis
      FROM myorder
      INNER JOIN kost ON myorder.idKost = kost.id
      LEFT JOIN jenis_kost ON kost.id_jenis = jenis_kost.id
      LEFT JOIN status_pesanan ON myorder.status_pesanan = status_pesanan.id
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
    body('Kategori').notEmpty(),
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

    const { idKost, Tanggal_mulai, Tanggal_berakhir, Total, Kategori } = req.body;
    const idUser = req.params.id;
    const statusPesanan = 1; // Status "belum bayar"

    const query = `
        INSERT INTO myorder (idUser, idKost, Tanggal_mulai, Tanggal_berakhir, Total, Kategori, status_pesanan)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

    connection.query(
      query,
      [idUser, idKost, Tanggal_mulai, Tanggal_berakhir, Total, Kategori, statusPesanan],
      function (err, result) {
        console.log('Parameters:', [idUser, idKost, Tanggal_mulai, Tanggal_berakhir, Total, Kategori]);
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
      }
    );
  }
);


router.post('/add-kost', [
  body('nama').notEmpty(),
  body('alamat').notEmpty(),
  body('jarak').notEmpty(),
  body('foto').notEmpty(),
  body('deskripsi').notEmpty(),
  body('fasilitas').notEmpty(),
  body('jenis').notEmpty(),
  body('kategori').notEmpty(),
  body('harga').notEmpty(),
  body('id_pemilik').notEmpty(),
], async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // Destructure the required fields from the request body
    const {
      nama,
      alamat,
      jarak,
      foto,
      deskripsi,
      fasilitas,
      jenis,
      kategori,
      harga,
      id_pemilik,
    } = req.body;

    // SQL query for inserting a new Kost
    const query = `
        INSERT INTO kost (nama, alamat, jarak, foto, deskripsi, fasilitas, id_jenis, id_kategori, harga, id_pemilik)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

    // Execute the SQL query
    connection.query(
      query,
      [nama, alamat, jarak, foto, deskripsi, fasilitas, jenis, kategori, harga, id_pemilik],
      (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: err.message,
          });
        }

        return res.status(201).json({
          status: true,
          message: 'Kost added successfully',
          kostId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error('Error adding Kost:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});


router.put('/update-kost/:kostId', [
  body('nama').notEmpty(),
  body('alamat').notEmpty(),
  body('jarak').notEmpty(),
  body('foto').notEmpty(),
  body('deskripsi').notEmpty(),
  body('fasilitas').notEmpty(),
  body('jenis').notEmpty(),
  body('kategori').notEmpty(),
  body('harga').notEmpty(),
  body('id_pemilik').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      nama,
      alamat,
      jarak,
      foto,
      deskripsi,
      fasilitas,
      jenis,
      kategori,
      harga,
      id_pemilik,
    } = req.body;
    const kostId = req.params.kostId;

    // SQL query for updating an existing Kost
    const query = `
        UPDATE kost
        SET nama = ?, alamat = ?, jarak = ?, foto = ?, deskripsi = ?, fasilitas = ?, id_jenis = ?, id_kategori = ?, harga = ?, id_pemilik = ?
        WHERE id = ?
      `;

    // Log the SQL query and parameters
    console.log('SQL Query:', query);
    console.log('Parameters:', [nama, alamat, jarak, foto, deskripsi, fasilitas, jenis, kategori, harga, id_pemilik, kostId]);

    // Execute the SQL query
    connection.query(
      query,
      [nama, alamat, jarak, foto, deskripsi, fasilitas, jenis, kategori, harga, id_pemilik, kostId],
      (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: err.message,
          });
        }

        console.log('Update Result:', result);

        return res.status(200).json({
          status: true,
          message: 'Kost updated successfully',
          kostId: kostId,
        });
      }
    );
  } catch (error) {
    console.error('Error updating Kost:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});

router.delete('/delete-kost/:kostId', (req, res) => {
  try {
    const kostId = req.params.kostId;

    const query = `
        DELETE FROM kost
        WHERE id = ?
      `;

    connection.query(query, [kostId], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
          error: err.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Kost deleted successfully',
        kostId: kostId,
      });
    });
  } catch (error) {
    console.error('Error deleting Kost:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});

router.get('/ordersOwner/:userId', (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: 'UserId is required.',
      });
    }

    // Fetch orders based on userId with JOIN to get kost details
    const query = `
  SELECT 
    myorder.id,
    myorder.Tanggal_mulai, 
    myorder.Tanggal_berakhir, 
    myorder.Total, 
    myorder.kategori,
    status_pesanan.status as status_pesanan,
    users.nama as nama_user,
    users.email as email_user,
    kost.nama, 
    kost.foto, 
    kost.deskripsi, 
    kost.alamat, 
    kost.jarak, 
    kost.harga,
    kost.suka,
    kost.fasilitas,
    kost.alamat,
    jenis_kost.jenis as jenis
  FROM myorder
  INNER JOIN kost ON myorder.idKost = kost.id
  LEFT JOIN jenis_kost ON kost.id_jenis = jenis_kost.id
  LEFT JOIN status_pesanan ON myorder.status_pesanan = status_pesanan.id
  LEFT JOIN users ON myorder.idUser = users.id
  WHERE kost.id_pemilik = ?;
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


router.put('/confirmPayment/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const ownerId = req.body.userId;

    // Check if orderId and ownerId are provided
    if (!orderId || !ownerId) {
      return res.status(400).json({
        status: false,
        message: 'OrderId and ownerId are required.',
      });
    }

    // Fetch the order based on orderId and ownerId
    const getOrderQuery = `
      SELECT myorder.*, kost.id_pemilik
      FROM myorder
      JOIN kost ON myorder.idKost = kost.id
      WHERE myorder.id = ? AND kost.id_pemilik = ?;
    `;

    connection.query(getOrderQuery, [orderId, ownerId], (err, orderResult) => {
      if (err) {
        console.error('Error fetching order:', err);
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      }

      // Check if the order exists
      if (orderResult.length === 0) {
        return res.status(404).json({
          status: false,
          message: 'Order not found.',
        });
      }

      const order = orderResult[0];

      // Check if the order is pending payment (status_pesanan: 1 for 'Belum bayar')
      if (order.status_pesanan !== 1) {
        return res.status(400).json({
          status: false,
          message: 'Invalid operation. Order is not pending payment.',
        });
      }

      // Update the order status to 'Sudah Bayar' (status_pesanan: 2)
      const updateOrderQuery = `
        UPDATE myorder
        SET status_pesanan = 2
        WHERE id = ?;
      `;

      connection.query(updateOrderQuery, [orderId], (updateErr) => {
        if (updateErr) {
          console.error('Error updating order status:', updateErr);
          return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Payment confirmed successfully.',
        });
      });
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});



module.exports = router;
