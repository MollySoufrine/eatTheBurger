$(function () {
  $(".eatBurger").on("click", function (event) {
    var id = $(this).data("id");

    $.ajax("/burgers/" + id, {
      method: "PUT",
      data: {
        devoured: true,
      },
    })
      .then(function () {
        console.log("This burger has been devoured");
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});
