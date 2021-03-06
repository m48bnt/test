(function() {

  'use strict';

  $(document).ready(function () {
    $.ajax({
      url: 'https://raw.githubusercontent.com/sportsru/table-task/master/seriea.json',
      type: 'GET',
      dataType: "json",
      success: function (data) {
        loadData(data)
      }
    });

    function loadData(json) {

      // Инициализация Handlebars
      var source = $("#template").html();
      var template = Handlebars.compile(source);

      // Обновление контента таблицы
      function updateTable(data) {
        $('.updates').html(template(data));
      }

      // Событие сортировки по колонкам таблицы
      $(document).on("click", ".stat-table th", function (event) {
        var data = json;
        var elem = event.currentTarget; // текущий показатель
        var key = elem.getAttribute("data-key"); // ключ, по которому сортируется массив команд
        var sortOrder = elem.getAttribute("data-sortorder"); // порядок сортировки (по убыванию / по возрастанию)

        // Проверка сортируется ли поле
        if (elem.getAttribute("data-sortable")) {
          data.teams = json.teams.sort(function (team1, team2) {
            if (key === 'name') {
              var name1 = team1[key].toUpperCase();
              var name2 = team2[key].toUpperCase();
              return (sortOrder === 'desc') ?
                (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0 :
                (name2 < name1) ? -1 : (name2 > name1) ? 1 : 0;
            } else {
              return (sortOrder === 'desc') ? team2[key] - team1[key] : team1[key] - team2[key];
            }
          });
          updateTable(data);

          // Меняем атрибут порядка сортировки
          (sortOrder === 'desc') ? elem.setAttribute("data-sortorder", "asc") : elem.setAttribute("data-sortorder", "desc");
        }
      });

      updateTable(json);
    }

  });

})();