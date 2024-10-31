// Функция внутри $( document ).ready() срабатывает после загрузки DOM.
$(document).ready(function() {
  console.log( "ready!" );
  // Поиск элемента в DOM по его id и замена его содержимого innerHTML с помощью JQuery.
  $("#message").html("Hello world!");
  
  // Обработка события клика по кнопкам.
  $(".btn-slide").click(function () {
    // Переключение класса кнопки, по которой кликнули.   
    $(this).toggleClass("active");
  });

  // Пример анимации.  
  $(".pane .delete").click(function(){
     $(this).parents(".pane").animate({ opacity: "hide" }, "slow");
  });

  // "Аккордион".
 $(".accordion h3:first").addClass("active");
 $(".accordion p:not(:first)").hide();
 $(".accordion h3").click(function () {
   $(this).next("p").slideToggle("slow")
     .siblings("p:visible").slideUp("slow");
   $(this).toggleClass("active");
   $(this).siblings("h3").removeClass("active");
 });

    
}); 
