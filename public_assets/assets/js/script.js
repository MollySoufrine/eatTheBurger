$(function () {
  $(".eatBurger").on("click", function (event) {
    var id = $(this).data("id");
    var devourBurger = $(this).data("devour");

    var ateTheBurger = {
      devouredBurger: devourBurger,
    };
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: ateTheBurger,
    }).then(function () {
      console.log("This burger has been devoured", devourBurger);
      location.reload();
    });
  });
});
