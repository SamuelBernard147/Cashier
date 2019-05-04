// Data Buah
var Buah = {
    dataGambar: [
        'https://freepngimg.com/thumb/apple_fruit/24954-4-apple-fruit-file.png',
        'http://rumahbelajar.skp-ham.org/wp-content/uploads/2015/01/durian.png',
        'https://www.freepngimg.com/thumb/orange/8-2-orange-png-clipart.png',
        'https://3.bp.blogspot.com/-46ddYT95q6E/V5obya5qeNI/AAAAAAAAAEM/5w8vU7bgHo8IkzDQkUzezp-V0rrit0IrQCLcB/s1600/Manfaat-Khasiat-obat-jus-BUAH-kulit-MANGGIS%2Bcopy.png',
        'http://pngimg.com/uploads/watermelon/watermelon_PNG2660.png'
    ],
    nama: [
        "Apel",
        "Durian",
        "Jeruk",
        "Manggis",
        "Semangka"
    ],
    harga: [
        35000,
        50000,
        14000,
        10000,
        10000
    ],
    stok: [
        100,
        100,
        100,
        100,
        100
    ],
    diskon: [
        10,
        10,
        20,
        5,
        10
    ]
};

// Inputan
// Form beli
var inputNama = document.getElementById('namaBuah')
var inputJml = document.getElementById('jmlBuah')
var inputKualitas = document.getElementById('kualitas')
var inputUang = document.getElementById('uang')

// Form management
var stokNama = document.getElementById('namaStokBuah')
var stokJumlah = document.getElementById('jmlStokBuah')
var stokHarga = document.getElementById('hargaStok')
var containerGambar = document.getElementById('gambarBuah')
var inputGambar = document.getElementById('urlGambar')


// Manipulasi array
// Cetak data secara ascending
function cetakDataBuah() {
    for (var I = 0; I < Buah.nama.length; I++) {
        var tr = document.createElement('tr');

        for (var i = 0; i < 1; i++) {
            var td = document.createElement('td');
            var item = document.createTextNode(I + 1)
            td.appendChild(item)
            tr.appendChild(td)

            var td = document.createElement('td');
            var img = new Image(50, 50)
            // img.src = 'image/' + Buah.dataGambar[I]
            img.src = Buah.dataGambar[I]
            td.appendChild(img)
            tr.appendChild(td)

            var td = document.createElement('td');
            var item = document.createTextNode(Buah.nama[I])
            td.appendChild(item)
            tr.appendChild(td)

            var td = document.createElement('td');
            var item = document.createTextNode("Rp " + Buah.harga[I])
            td.appendChild(item)
            tr.appendChild(td)

            var td = document.createElement('td');
            var item = document.createTextNode(Buah.stok[I])
            td.appendChild(item)
            tr.appendChild(td)
        };
        document.getElementById('list-buah').innerHTML += tr.outerHTML
    }
}

function cetakDataPosisi(posisi) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    var item = document.createTextNode(posisi)
    td.appendChild(item)
    tr.appendChild(td)

    var td = document.createElement('td');
    var img = new Image(50, 50)
    img.src = 'image/' + Buah.dataGambar[posisi]
    td.appendChild(img)
    tr.appendChild(td)

    var td = document.createElement('td');
    var item = document.createTextNode(Buah.nama[posisi])
    td.appendChild(item)
    tr.appendChild(td)

    var td = document.createElement('td');
    var item = document.createTextNode(Buah.harga[posisi])
    td.appendChild(item)
    tr.appendChild(td)

    var td = document.createElement('td');
    var item = document.createTextNode(Buah.stok[posisi])
    td.appendChild(item)
    tr.appendChild(td)

    document.getElementById('list-buah').innerHTML += tr.outerHTML
}

// Membalikan array
function reverseArray() {
    Buah.dataGambar.reverse()
    Buah.nama.reverse()
    Buah.harga.reverse()
    Buah.stok.reverse()
}

// Sort data
function sortData() {
    clearData()
    reverseArray()
    cetakDataBuah()
    // Merubah icon
    if (document.getElementById('sort').className == 'fa fa-angle-down') {
        document.getElementById('sort').className = 'fa fa-angle-up'
    } else if (document.getElementById('sort').className == 'fa fa-angle-up') {
        document.getElementById('sort').className = 'fa fa-angle-down'
    }
}

// Clear Data yang ada 
function clearData() {
    var list = document.getElementById('list-buah')
    // Selama list-buah masih mempunyai turunan maka akan di remove
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function updateData(posisi, stok, harga, gambar) {
    clearData()
    Buah.harga[posisi] = harga
    Buah.stok[posisi] = stok
    Buah.dataGambar[posisi] = gambar
    cetakDataBuah()
}

function kurangData(posisi, jml) {
    clearData()
    for (var i = 0; i < jml; i++) {
        Buah.stok[posisi]--
    }
    cetakDataBuah()
}

function cekStok(posisi, jml) {
    var stok = Buah.stok[posisi] - jml
    if (stok > 0) {
        return true
    } else {
        return false
    }
}

// Rubah harga
function rubahHarga() {
    var namaBuah = inputNama.value;
    var jmlBuah = inputJml.value;
    var kualitas = inputKualitas.value;

    var posisi = Buah.nama.indexOf(namaBuah)
    var hargaBuah = Buah.harga[posisi]

    var diskon
    if (jmlBuah > 3) {
        diskon = Buah.diskon[posisi]
    } else {
        diskon = 0
    }

    var potongan = hargaBuah * jmlBuah * diskon / 100
    document.getElementById('hargaSatuan').value = "Rp " + hitungTotal(hargaBuah, 1, kualitas, 0)
    document.getElementById('diskon').value = "Rp " + potongan
    document.getElementById('hargaTotal').value = "Rp " + hitungTotal(hargaBuah, jmlBuah, kualitas, diskon)
};

// Function dengan return
function hitungTotal(harga, jumlah, kualitas, diskon) {
    const kualitasA = 5000
    // const kualitasB = 0
    const kualitasC = -5000

    if (kualitas == 'A') {
        hargaAwal = (harga + kualitasA) * jumlah
        var potongan = hargaAwal * diskon / 100
        total = hargaAwal - potongan
    } else if (kualitas == 'B') {
        hargaAwal = harga * jumlah
        var potongan = hargaAwal * diskon / 100
        total = hargaAwal - potongan
    } else if (kualitas == 'C') {
        hargaAwal = (harga + kualitasC) * jumlah
        var potongan = hargaAwal * diskon / 100
        total = hargaAwal - potongan
    } else {
        total = 0
    }
    return total
};

function hitungKembalian(uang, hargaTotal) {
    // var potongan = hargaTotal * diskon / 100
    return uang - hargaTotal
};

function getDate() {
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    var now = day + '/' + month + '/' + year
    return now
}

function tambahRiwayat(buah, jumlah, harga, kualitas) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    var item = document.createTextNode(buah)
    td.appendChild(item)
    tr.appendChild(td)

    var td = document.createElement('td');
    var item = document.createTextNode(jumlah)
    td.appendChild(item)
    tr.appendChild(td)

    var td = document.createElement('td');
    var item = document.createTextNode(kualitas)
    td.appendChild(item)
    tr.appendChild(td)

    var td = document.createElement('td');
    var item = document.createTextNode(harga)
    td.appendChild(item)
    tr.appendChild(td)

    var td = document.createElement('td');
    var item = document.createTextNode(getDate())
    td.appendChild(item)
    tr.appendChild(td)

    document.getElementById('list-transaksi').innerHTML += tr.outerHTML
}

// Function ketika dibeli
function beliBuah() {
    var namaBuah = inputNama.value;
    var jmlBuah = inputJml.value;
    var kualitas = inputKualitas.value;
    var uang = inputUang.value;

    var posisi = Buah.nama.indexOf(namaBuah)
    var hargaBuah = Buah.harga[posisi]

    var diskon
    if (jmlBuah > 3) {
        diskon = Buah.diskon[posisi]
    } else {
        diskon = 0
    }

    var hargaTotal = hitungTotal(hargaBuah, jmlBuah, kualitas, diskon)
    var sisa = hitungKembalian(uang, hargaTotal)

    if (sisa > 0 && hargaTotal > 0) {
        if (cekStok(posisi, jmlBuah)) {
            alert('Transaksi berhasil, uang kembalian anda Rp ' + sisa)
            tambahRiwayat(namaBuah, jmlBuah, hargaTotal, kualitas)
            kurangData(posisi, jmlBuah)
        } else {
            alert('Stok buah tidak cukup')
        }

    } else if (sisa == 0 && hargaTotal > 0) {
        if (cekStok(posisi, jmlBuah)) {
            alert('Transaksi berhasil')
            tambahRiwayat(namaBuah, jmlBuah, hargaTotal, kualitas)
            kurangData(posisi, jmlBuah)
        } else {
            alert('Stok buah tidak cukup')
        }
    } else if (sisa < 0) {
        alert('Transaksi Gagal, uang anda kurang Rp ' + sisa)
    } else {
        alert('Mohon masukan nominal uang dengan benar')
    }
}

function rubahStok() {
    var namaBuah = stokNama.value

    var posisi = Buah.nama.indexOf(namaBuah)
    var hargaBuah = Buah.harga[posisi]
    var stokBuah = Buah.stok[posisi]

    inputGambar.value = Buah.dataGambar[posisi]
    rubahGambar()

    jmlStokBuah.value = stokBuah
    hargaStok.value = hargaBuah
}

function rubahGambar() {
    containerGambar.src = inputGambar.value
}

function simpanData() {
    var namaBuah = stokNama.value
    var jmlStokBuah = stokJumlah.value
    var hargaStok = stokHarga.value
    var gambar = inputGambar.value

    var posisi = Buah.nama.indexOf(namaBuah)
    updateData(posisi, jmlStokBuah, hargaStok, gambar)

    alert('Data berhasil disimpan')
}

function searchBuah() {
    var namaBuah = document.getElementById('inputSearch').value
    var i = 0
    while (i < Buah.nama.length) {
        var data = Buah.nama[i]
        if (data.match(namaBuah)) {
            clearData()
            cetakDataPosisi(i)
            break;
        } else {
            document.getElementById('list-buah').innerHTML = 'Data tidak ditemukan'
            i++
        }
    }
}

cetakDataBuah()