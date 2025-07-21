function getActiveTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    callback(tabs[0]);
  });
}

function getAllCookies(domain, callback) {
  chrome.cookies.getAll({ url: domain }, function (cookies) {
    let result = cookies.map(c => `${c.name}=${c.value}`).join('; ');
    callback(result);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  getActiveTab(tab => {
    getAllCookies(tab.url, cookieString => {
      document.getElementById("cookies").value = cookieString || "Tidak ada cookie ditemukan.";
    });

    document.getElementById("useragent").value = navigator.userAgent;

    // Tombol Copy terpisah
    document.getElementById("copyCookies").onclick = () => {
      const cookies = document.getElementById("cookies").value;
      navigator.clipboard.writeText(cookies).then(() => {
        alert("✅ Cookies berhasil disalin!");
      });
    };

    document.getElementById("copyUA").onclick = () => {
      const ua = document.getElementById("useragent").value;
      navigator.clipboard.writeText(ua).then(() => {
        alert("✅ User-Agent berhasil disalin!");
      });
    };
  });
});
