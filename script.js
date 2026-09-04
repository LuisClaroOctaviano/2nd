$(document).ready(function () {

  // Date picker: only today and future dates are allowed.
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayString = `${yyyy}-${mm}-${dd}`;

  $("#date-selected").attr("min", todayString);

  function updateDateDisplay() {
    const selected = $("#date-selected").val();
    const display = $("#date-message");

    if (!selected) {
      display.removeClass("has-date").html("<span>✨</span><span>Select a date to continue</span>");
      return;
    }

    const selectedDate = new Date(selected + "T00:00:00");
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    display
      .addClass("has-date")
      .html("<span>💖</span><span>" + formattedDate + "</span>");
  }

  $("#date-selected").on("change", updateDateDisplay);

  $("#clear-date").on("click", function () {
    $("#date-selected").val("");
    updateDateDisplay();
    $("#meal-recipie").empty();
    $("#cafe-recipie").empty();
  });

  updateDateDisplay();


  const places = {
    Japanese: {
      "kodawari": {
        name: "Kodawari",
        location: "121 L.P. Leviste Street, Salcedo Village, Makati City",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80"
      },
      "yotteba": {
        name: "Yotteba Izakaya Revolution",
        location: "Unit G-H, Marvin Plaza Building, 2153 Chino Roces Ave, Pio del Pilar, Makati City",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80"
      },
      "ginza-gyu": {
        name: "Ginza Gyu",
        location: "109 Don Carlos Palanca, Legazpi Village, Makati City",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
      }
    },
    Filipino: {
      "sarsa": {
        name: "Sarsa Kitchen + Bar",
        location: "109 Rada Street, Legazpi Village, Makati City",
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80"
      },
      "sama-sama": {
        name: "Sama Sama",
        location: "Urban Avenue, Makati City",
        image: "https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=1200&q=80"
      },
      "emily": {
        name: "Emily Restaurant",
        location: "Makati City, Metro Manila",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80"
      }
    },
    Thai: {
      "khao-kai": {
        name: "Khao Kai",
        location: "Poblacion, Makati City",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70f1?auto=format&fit=crop&w=1200&q=80"
      },
      "nara-thai": {
        name: "Nara Thai",
        location: "GF Garden Towers, Palm Promenade, Antonio Arnaiz Ave, Makati City",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80"
      },
      "real-thai": {
        name: "Real Thai Restaurant",
        location: "4992 P. Guanzon, Poblacion, Makati City",
        image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=80"
      }
    },
    Vietnamese: {
      "ha-noi-pho": {
        name: "Ha Noi Pho",
        location: "925 J. P. Rizal Street, Poblacion, Makati City",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80"
      },
      "old-saigon": {
        name: "Old Saigon",
        location: "Linear Makati Tower 2, Mayapis Street corner Yakal, Makati City",
        image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=1200&q=80"
      },
      "pho-min-vu": {
        name: "Pho Min Vu",
        location: "Makati City, Metro Manila",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80"
      }
    }
  };

  // Cuisine selection ONLY populates the Place dropdown.
  // No cuisine description/card is displayed here.
  $("#meal-searched").on("change", function () {
    const cuisine = $(this).val();
    const placeSelect = $("#place-selected");

    placeSelect.empty().append(
      $("<option>", {
        value: "",
        text: cuisine ? "Choose a place" : "Choose cuisine first",
        disabled: true,
        selected: true
      })
    );

    if (cuisine && places[cuisine]) {
      Object.keys(places[cuisine]).forEach(function (key) {
        placeSelect.append(
          $("<option>", {
            value: key,
            text: places[cuisine][key].name
          })
        );
      });

      placeSelect.prop("disabled", false);
    } else {
      placeSelect.prop("disabled", true);
    }

    $("#meal-recipie").empty();
  });

  // Cuisine button no longer displays a cuisine description.
  $(".meal-selection").click(function () {
    if (!$("#meal-searched").val()) {
      showMessage("#meal-recipie", "Please choose a cuisine first.");
    }
  });

  // Place selection displays the image + description.
  $(".place-selection").on("click", function (event) {
    event.preventDefault();

    const cuisine = $("#meal-searched").val();
    const placeValue = $("#place-selected").val();
    const selectedDate = $("#date-selected").val();

    if (!cuisine) {
      showMessage("#meal-recipie", "Please choose a cuisine first.");
      return;
    }

    if (!placeValue) {
      showMessage("#meal-recipie", "Please choose a place.");
      return;
    }

    if (!selectedDate) {
      showMessage("#meal-recipie", "Please choose a date first.");
      return;
    }

    const place = places[cuisine] && places[cuisine][placeValue];

    if (!place) {
      showMessage("#meal-recipie", "That place is currently unavailable.");
      return;
    }

    buildPlaceCard(place);
  });

  // Cafe selection remains independent and unchanged in purpose.
  $(".cafe-selection").click(function () {
    const cafeValue = $("#cafe-selected").val();
    const selectedDate = $("#date-selected").val();

    if (!selectedDate) {
      showMessage("#cafe-recipie", "Please choose a date first.");
      return;
    }

    if (!cafeValue) {
      showMessage("#cafe-recipie", "Please choose a cafe first.");
      return;
    }

    buildCafeCard(cafeValue);
  });

  function showMessage(target, message) {
    $(target).html(
      $("<div>").addClass("card-panel red lighten-4").text(message)
    );
  }

  function buildPlaceCard(place) {
    $("#meal-recipie").empty();

    const card = $("<div>").addClass("card recommendation-card placeCard");
    const cardImg = $("<div>").addClass("card-image");

    $("<img>")
      .attr("src", place.image)
      .attr("alt", place.name)
      .on("error", function () {
        $(this).hide();
      })
      .appendTo(cardImg);

    const cardBody = $("<div>").addClass("card-content");

    $("<span>")
      .addClass("card-title")
      .text(place.name)
      .appendTo(cardBody);

    $("<p>")
      .addClass("location")
      .text("📍 " + place.location)
      .appendTo(cardBody);

    card.append(cardImg, cardBody);
    $("#meal-recipie").append(card);
  }

  const cafes = {
    "fr-mgmt": {
      name: "FR MGMT",
      description: "A cozy hybrid café, resto-bar, and creative space in Legazpi Village. It has a relaxed daytime atmosphere for coffee and work, then becomes more social in the evening.",
      location: "Legazpi Village, Makati",
      image: "https://images.squarespace-cdn.com/content/v1/636b5e138fd7c9613e2a8b61/83a5a44e-033b-4357-bcb1-7427b3252c6f/FI.jpg"
    },
    saglit: {
      name: "Saglit",
      description: "A charming café in Poblacion known for specialty coffee, creative seasonal drinks, pastries, and a calm atmosphere.",
      location: "Poblacion, Makati",
      image: "https://flowerranchcafe.com/cdn/shop/files/DSCF2991.jpg?v=1753351517&width=533"
    },
    majikasa: {
      name: "Majikasa",
      description: "A pet-friendly café with a warm, art-filled interior serving coffee, tea, pastries, smoothies, and other refreshments.",
      location: "Chino Roces Avenue Extension, Makati",
      image: "https://primer.com.ph/food/wp-content/uploads/sites/4/2025/08/645d64f638a0d6a04271a5c554566ed7.jpg"
    },
    koffle: {
      name: "Koffle",
      description: "A cozy, homey café in Makati suited for studying or working, with coffee, waffles, and comforting food and drinks.",
      location: "Zobel Roxas Street, Makati",
      image: "https://brewsingcoffeeintaft.com/wp-content/uploads/2026/03/Koffle_image6-1536x1536.jpg"
    }
  };

  function buildCafeCard(cafeValue) {
    const cafe = cafes[cafeValue];

    if (!cafe) {
      showMessage("#cafe-recipie", "Cafe information is unavailable.");
      return;
    }

    $("#cafe-recipie").empty();

    const card = $("<div>").addClass("card recommendation-card cafeCard");
    const cardImg = $("<div>").addClass("card-image");

    $("<img>")
      .attr("src", cafe.image)
      .attr("alt", cafe.name + " cafe")
      .appendTo(cardImg);

    const cardBody = $("<div>").addClass("card-content");

    $("<span>")
      .addClass("card-title")
      .text(cafe.name)
      .appendTo(cardBody);

    $("<p>")
      .addClass("location")
      .text("📍 " + cafe.location)
      .appendTo(cardBody);

    card.append(cardImg, cardBody);
    $("#cafe-recipie").append(card);
  }
});
