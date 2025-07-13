// Tidak perlu let keranjang = [] lagi di atas

// Tambah ke keranjang
function tambahKeKeranjang(namaProduk, hargaProduk) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.push({ nama: namaProduk, harga: hargaProduk });
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  alert(`${namaProduk} ditambahkan ke keranjang.`);
  tampilkanKeranjang();
}

// Tampilkan keranjang
function tampilkanKeranjang() {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  const daftarKeranjang = document.getElementById('daftar-keranjang');
  const totalHarga = document.getElementById('total-harga');
  if (!daftarKeranjang || !totalHarga) return;

  daftarKeranjang.innerHTML = '';
  let total = 0;

  keranjang.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} - Rp${item.harga.toLocaleString('id-ID')}`;

    const btnHapus = document.createElement('button');
    btnHapus.textContent = 'Hapus';
    btnHapus.onclick = function () {
      hapusDariKeranjang(index);
    };
    li.appendChild(btnHapus);
    daftarKeranjang.appendChild(li);
    total += item.harga;
  });

  totalHarga.textContent = `Total: Rp${total.toLocaleString('id-ID')}`;
}

// Hapus item
function hapusDariKeranjang(index) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.splice(index, 1);
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  tampilkanKeranjang();
}

// Checkout tetap, hanya tambahkan:
function checkout() {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  if (keranjang.length === 0) {
    alert('Keranjang masih kosong!');
    return;
  }
  const form = document.getElementById('form-checkout');

  if (form.style.display === 'block') {
    form.style.display = 'none';
  } else {
    form.style.display = 'block';
  }
}

// Proses checkout
function prosesCheckout() {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  const nama = document.getElementById('namaPembeli').value.trim();
  const alamat = document.getElementById('alamatPembeli').value.trim();
  const metode = document.getElementById('metodeBayar').value;

  if (!nama || !alamat) {
    alert('Lengkapi data pengiriman.');
    return;
  }

  let pesan = `Halo, saya mau pesan:\n`;
  keranjang.forEach(item => {
    pesan += `- ${item.nama} - Rp${item.harga.toLocaleString('id-ID')}\n`;
  });

  const total = keranjang.reduce((sum, item) => sum + item.harga, 0);
  pesan += `\nTotal: Rp${total.toLocaleString('id-ID')}`;
  pesan += `\n\nNama: ${nama}\nAlamat: ${alamat}\nMetode Pembayaran: ${metode}`;

  const noWA = '6283878426362';
  const url = `https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');

  localStorage.removeItem('keranjang');
  tampilkanKeranjang();
  document.getElementById('form-checkout').style.display = 'none';

  document.getElementById('namaPembeli').value = '';
  document.getElementById('alamatPembeli').value = '';
  document.getElementById('metodeBayar').value = 'COD';
}
