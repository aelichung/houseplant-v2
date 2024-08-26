$(function() {
  const url = new URL(window.location)
  const pageParams = new URLSearchParams(url.search)
  const iconContainer = $(".easy-icon-container")

  let isLowLight = pageParams.get("light") === "true"
  let isMostSoils = pageParams.get("soil") === "true"
  let isLowWater = pageParams.get("water") === "true"
  let isWideTemp = pageParams.get("temp") === "true"

  const lightFilter = $(".sun-icon")
  const soilFilter = $(".soil-icon")
  const waterFilter = $(".water-icon")
  const tempFilter = $(".temp-icon")

  updateFilterIcons(lightFilter, isLowLight);
  updateFilterIcons(soilFilter, isMostSoils);
  updateFilterIcons(waterFilter, isLowWater);
  updateFilterIcons(tempFilter, isWideTemp);

  const lightButton = document.getElementById('lightButton')
  const soilButton = document.getElementById('soilButton')
  const waterButton = document.getElementById('waterButton')
  const tempButton = document.getElementById('tempButton')



  lightButton.addEventListener('click', ()=>{
      isLowLight = !isLowLight;
      updateFilterIcons(lightFilter, isLowLight);
  })
  soilButton.addEventListener('click', ()=>{
      isMostSoils = !isMostSoils;
      updateFilterIcons(soilFilter, isMostSoils);
  })
  waterButton.addEventListener('click', ()=>{
      isLowWater = !isLowWater;
      updateFilterIcons(waterFilter, isLowWater);
  })
  tempButton.addEventListener('click', ()=>{
      isWideTemp = !isWideTemp;
      updateFilterIcons(tempFilter, isWideTemp);
  })

  const filterButton = document.getElementById('filterButton')
  filterButton.addEventListener('click', ()=>{
    const filterObj = {light:isLowLight, soil: isMostSoils, water: isLowWater, temp: isWideTemp}
    const filterParams = new URLSearchParams(filterObj)
    window.location.assign("./gallery?" + filterParams.toString());
  })

  var handle = $( "#custom-handle" );
  var handleb = $( "#custom-handleb" );

  $("#slider").slider({
      range: true,
      step: 5,
      values: [2 , 50],
      min: 2,
      max: 100,
      animate: "fast",
      classes: {
        "ui-slider" : "highlight"
      },
      create: function() {
        handle.text( '$' + $( this ).slider( "values" , 0) );
        handleb.text( '$' + $( this ).slider( "values" , 1 ) );
        },
      slide: function( event, ui ) {
          handle.text( '$' + ui.values[0] );
          handleb.text( '$' + ui.values[1] );
        }
    });

  $(".filter-easy").click(function(){
      $(".item").not(".easy-item").css("display", "none");
      $(".item").filter(".easy-item").css("display", "flex");
      $(".item").filter(".easy-item").slice(0, 13).show();
      $(".item").filter(".easy-item").slice(12).css("display" , "none");
      $(".easy-header").css("display" , "block");
      $(".brush-header").not(".easy-header").css("display", "none");
      $(".easy-top-container").css("display" , "flex");
  });

  $(".item").hover(function() {
    $(this).children(".item-overlay").css("opacity", "1");
  }, function() {
    $(this).children(".item-overlay").css("opacity", "0");
  });

  $(".item-overlay").click(function() {
    window.location.assign("./product-page.html");
  });


  function updateFilterIcons(icon, enabled) {
    let enabledString = enabled ? "block" : "none"
    let disabledString = !enabled ? "block" : "none"
    icon.find(".icon-inactive").css("display", disabledString);
    icon.find(".icon-active").css("display", enabledString);
    icon.unbind("mouseenter mouseleave");
    let fontWt = enabled ? "600" : "400"
    icon.find(".easy-icon-text").css("font-weight", fontWt);

  }

  // $(".easy-icon-container").hover(function() {
  //   $(this).find(".icon-inactive").css("display", "none");
  //   $(this).find(".icon-active").css("display", "block");
  // }, function() {
  //   $(this).find(".icon-active").css("display", "none");
  //   $(this).find(".icon-inactive").css("display", "block");
  // });

});
