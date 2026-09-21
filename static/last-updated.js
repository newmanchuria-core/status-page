/* QuickFind 状态站 · “最后更新”本地化/格式化脚本
   注入方式见 README：在模板页面 </body> 前加 <script src="/last-updated.js" defer></script>。
   Upptime 数据来自 public/api/summary.json；此处把 ISO 时间转成本地可读时间。 */
(function () {
  function fmt(iso) {
    try {
      var d = new Date(iso);
      return d.toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false
      });
    } catch (e) { return iso; }
  }
  function attach(lastUpdated) {
    var el = document.getElementById('qf-last-updated');
    if (!el) {
      el = document.createElement('div');
      el.id = 'qf-last-updated';
      var main = document.querySelector('main') || document.body;
      main.appendChild(el);
    }
    el.textContent = '最后更新：' + fmt(lastUpdated);
  }
  fetch('/api/summary.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.lastStatusChange) attach(data.lastStatusChange);
      else if (data && (data.updated_at || data.time)) attach(data.updated_at || data.time);
    })
    .catch(function () {});
})();
