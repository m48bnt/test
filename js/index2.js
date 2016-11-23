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

      $(".stat-table th.table-command").data({ sortable: "true", "sortOrder": "desc", "key": "name" });
      $(".stat-table th.table-matches").data({ sortable: "true", "sortOrder": "desc", "key": "matches" });
      $(".stat-table th.table-wins").data({ sortable: "true", "sortOrder": "desc", "key": "win" });
      $(".stat-table th.table-draws").data({ sortable: "true", "sortOrder": "desc", "key": "draw" });
      $(".stat-table th.table-losses").data({ sortable: "true", "sortOrder": "desc", "key": "lose" });
      $(".stat-table th.table-goals").data({ sortable: "true", "sortOrder": "desc", "key": "goals" });
      $(".stat-table th.table-missing").data({ sortable: "true", "sortOrder": "desc", "key": "conceded_goals" });
      $(".stat-table th.table-pts").data({ sortable: "true", "sortOrder": "desc", "key": "score" });

      // Событие сортировки по колонкам таблицы
      $(document).on("click", ".stat-table th", function (event) {
        var data = json;
        var elem = $(event.currentTarget); // текущий показатель
        var key = elem.data("key"); // ключ, по которому сортируется массив команд
        var sortOrder = elem.data("sortOrder"); // порядок сортировки (по убыванию / по возрастанию)

        // Проверка сортируется ли поле
        if (elem.data("sortable")) {
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
          (sortOrder === 'desc') ? elem.data("sortOrder", "asc") : elem.data("sortOrder", "desc");
        }
      });

      updateTable(json);
    }

  });

})();