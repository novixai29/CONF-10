"use strict";


/* =========================================================
   CONF-010 — HORIZON ASSEMBLY

   EDIT ALL CLIENT INFORMATION HERE ONLY
========================================================= */

const CONFERENCE = {

  name:
    "Horizon Assembly 2027",

  shortName:
    "HA / 27",

  tagline:
    "Designing cities that can live with the future.",

  organizer:
    "Urban Futures Council",


  startAt:
    "2027-11-04T09:00:00+03:00",

  endAt:
    "2027-11-04T17:30:00+03:00",

  timeZone:
    "Asia/Baghdad",


  venue:
    "Baghdad Urban Futures Center",

  city:
    "Baghdad",

  country:
    "Iraq",


  /*
    Leave empty to generate
    a Google Maps search automatically.
  */
  mapsUrl:
    "",


  /*
    External registration only.
    Leave empty to hide registration button.
  */
  registrationUrl:
    "https://example.com/register",


  websiteUrl:
    "https://example.com",


  /*
    Leave empty to use current page URL.
  */
  shareUrl:
    "",


  keynote: {

    name:
      "Nadia Farouk",

    role:
      "Urban Systems Architect",

    organization:
      "Civic Futures Studio",

    topic:
      "The City After Efficiency"

  },


  assembly: [

    {
      label:
        "CITY",

      title:
        "The city is a living system.",

      description:
        "A future city is not a collection of buildings. It is the relationship between people, infrastructure, climate and everyday life."
    },

    {
      label:
        "ENERGY",

      title:
        "Energy becomes part of the architecture.",

      description:
        "Buildings, streets and districts can move from consuming energy to becoming active parts of a distributed urban energy system."
    },

    {
      label:
        "MOBILITY",

      title:
        "Movement shapes the city.",

      description:
        "The question is no longer how quickly cars move, but how easily people reach work, learning, services and each other."
    },

    {
      label:
        "PEOPLE",

      title:
        "The final measure is human life.",

      description:
        "Technology and infrastructure matter only when they produce healthier, safer and more useful places for people."
    }

  ],


  program: [

    {
      number:
        "01",

      time:
        "10:00",

      type:
        "Urban Systems",

      title:
        "Living Infrastructure",

      description:
        "How energy, water and buildings can behave as connected urban systems."
    },

    {
      number:
        "02",

      time:
        "12:30",

      type:
        "Mobility",

      title:
        "The Fifteen-Minute Question",

      description:
        "A discussion about proximity, public space and designing cities around daily human needs."
    },

    {
      number:
        "03",

      time:
        "15:00",

      type:
        "Future Cities",

      title:
        "Beyond Smart",

      description:
        "Why the next generation of cities may need to be resilient, adaptable and humane before they are smart."
    }

  ]

};



/* =========================================================
   DATES
========================================================= */

const START_DATE =
  new Date(
    CONFERENCE.startAt
  );


const END_DATE =
  new Date(
    CONFERENCE.endAt
  );


let countdownTimer =
  null;


let currentAssemblyIndex =
  0;



/* =========================================================
   ELEMENTS
========================================================= */

const elements = {

  heroDate:
    document.getElementById(
      "heroDate"
    ),

  heroTime:
    document.getElementById(
      "heroTime"
    ),

  heroCity:
    document.getElementById(
      "heroCity"
    ),


  assemblyScene:
    document.getElementById(
      "assemblyScene"
    ),

  assemblyIndex:
    document.getElementById(
      "assemblyIndex"
    ),

  assemblyTitle:
    document.getElementById(
      "assemblyTitle"
    ),

  assemblyDescription:
    document.getElementById(
      "assemblyDescription"
    ),

  horizonRange:
    document.getElementById(
      "horizonRange"
    ),


  countdownProgress:
    document.getElementById(
      "countdownProgress"
    ),

  countdownSun:
    document.getElementById(
      "countdownSun"
    ),

  days:
    document.getElementById(
      "days"
    ),

  hours:
    document.getElementById(
      "hours"
    ),

  minutes:
    document.getElementById(
      "minutes"
    ),

  seconds:
    document.getElementById(
      "seconds"
    ),

  countdownMessage:
    document.getElementById(
      "countdownMessage"
    ),


  keynoteName:
    document.getElementById(
      "keynoteName"
    ),

  keynoteRole:
    document.getElementById(
      "keynoteRole"
    ),

  keynoteOrganization:
    document.getElementById(
      "keynoteOrganization"
    ),

  keynoteTopic:
    document.getElementById(
      "keynoteTopic"
    ),


  programGrid:
    document.getElementById(
      "programGrid"
    ),


  venueCity:
    document.getElementById(
      "venueCity"
    ),

  venueCountry:
    document.getElementById(
      "venueCountry"
    ),


  mapButton:
    document.getElementById(
      "mapButton"
    ),

  secondaryMapButton:
    document.getElementById(
      "secondaryMapButton"
    ),

  registerButton:
    document.getElementById(
      "registerButton"
    ),

  websiteButton:
    document.getElementById(
      "websiteButton"
    ),


  calendarButton:
    document.getElementById(
      "calendarButton"
    ),

  shareButton:
    document.getElementById(
      "shareButton"
    ),

  topShareButton:
    document.getElementById(
      "topShareButton"
    ),


  footerYear:
    document.getElementById(
      "footerYear"
    ),

  statusMessage:
    document.getElementById(
      "statusMessage"
    )

};



/* =========================================================
   INITIAL CONTENT
========================================================= */

function populateConference() {

  document
    .querySelectorAll(
      "[data-field]"
    )
    .forEach(
      element => {

        const field =
          element.dataset.field;


        if (
          Object.prototype.hasOwnProperty.call(
            CONFERENCE,
            field
          )
        ) {

          element.textContent =
            CONFERENCE[field];

        }

      }
    );


  elements.heroDate.textContent =
    formatHeroDate(
      START_DATE
    );


  elements.heroTime.textContent =
    `${format24Time(START_DATE)} — ${format24Time(END_DATE)}`;


  elements.heroCity.textContent =
    `${CONFERENCE.city.toUpperCase()} / ${CONFERENCE.country.toUpperCase()}`;


  elements.keynoteName.textContent =
    CONFERENCE.keynote.name;


  elements.keynoteRole.textContent =
    CONFERENCE.keynote.role;


  elements.keynoteOrganization.textContent =
    CONFERENCE.keynote.organization;


  elements.keynoteTopic.textContent =
    CONFERENCE.keynote.topic;


  elements.venueCity.textContent =
    CONFERENCE.city.toUpperCase();


  elements.venueCountry.textContent =
    CONFERENCE.country;


  elements.footerYear.textContent =
    START_DATE.getFullYear();


  configureLinks();

  updateMetadata();

  addStructuredData();

}



/* =========================================================
   DATE FORMATTING
========================================================= */

function formatHeroDate(date) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone:
        CONFERENCE.timeZone,

      day:
        "2-digit",

      month:
        "long",

      year:
        "numeric"
    }
  )
    .format(date)
    .toUpperCase();

}



function format24Time(date) {

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      timeZone:
        CONFERENCE.timeZone,

      hour:
        "2-digit",

      minute:
        "2-digit",

      hour12:
        false
    }
  ).format(date);

}



/* =========================================================
   HORIZON ASSEMBLY
========================================================= */

function setupAssembly() {

  const buttons =
    Array.from(
      document.querySelectorAll(
        ".assembly-button"
      )
    );


  const positions =
    [
      8,
      37,
      66,
      92
    ];


  /*
    Slider movement
  */

  elements.horizonRange
    .addEventListener(
      "input",
      () => {

        const value =
          Number(
            elements.horizonRange.value
          );


        setHorizonPosition(
          value
        );


        const index =
          getAssemblyIndex(
            value
          );


        if (
          index !==
          currentAssemblyIndex
        ) {

          currentAssemblyIndex =
            index;


          updateAssembly(
            index,
            buttons,
            false
          );

        }

      }
    );


  /*
    Snap to closest point
  */

  elements.horizonRange
    .addEventListener(
      "change",
      () => {

        const value =
          Number(
            elements.horizonRange.value
          );


        const index =
          getAssemblyIndex(
            value
          );


        const finalPosition =
          positions[index];


        elements.horizonRange.value =
          finalPosition;


        setHorizonPosition(
          finalPosition
        );


        updateAssembly(
          index,
          buttons
        );

      }
    );


  /*
    Button fallback
  */

  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.assemblyIndex
            );


          currentAssemblyIndex =
            index;


          elements.horizonRange.value =
            positions[index];


          setHorizonPosition(
            positions[index]
          );


          updateAssembly(
            index,
            buttons
          );

        }
      );

    }
  );


  setHorizonPosition(
    positions[0]
  );


  updateAssembly(
    0,
    buttons,
    false
  );

}



/* =========================================================
   HORIZON POSITION
========================================================= */

function setHorizonPosition(value) {

  document.documentElement
    .style
    .setProperty(
      "--horizon-position",
      `${value}%`
    );

}



/* =========================================================
   GET ASSEMBLY INDEX
========================================================= */

function getAssemblyIndex(value) {

  if (value < 24) {
    return 0;
  }


  if (value < 52) {
    return 1;
  }


  if (value < 80) {
    return 2;
  }


  return 3;

}



/* =========================================================
   UPDATE ASSEMBLY
========================================================= */

function updateAssembly(
  index,
  buttons,
  animate = true
) {

  const item =
    CONFERENCE.assembly[index];


  if (!item) {
    return;
  }


  currentAssemblyIndex =
    index;


  elements.assemblyScene.dataset.stage =
    String(index);


  /*
    Build skyline progressively
  */

  document
    .querySelectorAll(
      ".city-building"
    )
    .forEach(
      building => {

        const buildStage =
          Number(
            building.dataset.buildStage
          );


        building.classList.toggle(
          "is-built",
          buildStage <= index
        );

      }
    );


  /*
    Move sun progressively
  */

  const sun =
    document.querySelector(
      ".assembly-sun"
    );


  if (sun) {

    const sunPositions = [
      {
        left: "14%",
        top: "15%"
      },

      {
        left: "35%",
        top: "9%"
      },

      {
        left: "58%",
        top: "12%"
      },

      {
        left: "78%",
        top: "24%"
      }
    ];


    sun.style.left =
      sunPositions[index].left;


    sun.style.top =
      sunPositions[index].top;

  }


  /*
    Buttons
  */

  buttons.forEach(
    (button, buttonIndex) => {

      const active =
        buttonIndex === index;


      button.classList.toggle(
        "is-active",
        active
      );


      button.setAttribute(
        "aria-selected",
        String(active)
      );

    }
  );


  const applyContent =
    () => {

      elements.assemblyIndex.textContent =
        `${pad(index + 1)} / ${item.label}`;


      elements.assemblyTitle.textContent =
        item.title;


      elements.assemblyDescription.textContent =
        item.description;

    };


  if (
    !animate ||
    prefersReducedMotion()
  ) {

    applyContent();

    return;

  }


  const readout =
    elements.assemblyTitle.parentElement;


  const fade =
    readout.animate(
      [
        {
          opacity: 1,
          transform:
            "translateY(0)"
        },

        {
          opacity: 0,
          transform:
            "translateY(7px)"
        }
      ],
      {
        duration:
          130,

        fill:
          "forwards",

        easing:
          "ease-in"
      }
    );


  fade.onfinish =
    () => {

      applyContent();


      readout.animate(
        [
          {
            opacity: 0,
            transform:
              "translateY(7px)"
          },

          {
            opacity: 1,
            transform:
              "translateY(0)"
          }
        ],
        {
          duration:
            220,

          fill:
            "forwards",

          easing:
            "ease-out"
        }
      );

    };

}



/* =========================================================
   PROGRAM
========================================================= */

function renderProgram() {

  elements.programGrid.innerHTML =
    "";


  CONFERENCE.program.forEach(
    item => {

      const article =
        document.createElement(
          "article"
        );


      article.className =
        "program-block reveal";


      article.innerHTML = `

        <div class="program-block__top">

          <span class="program-block__number">
            ${escapeHTML(item.number)}
          </span>

          <span>
            ${escapeHTML(item.time)}
          </span>

        </div>


        <div>

          <p class="section-kicker">
            ${escapeHTML(item.type)}
          </p>

          <h3>
            ${escapeHTML(item.title)}
          </h3>

          <p>
            ${escapeHTML(item.description)}
          </p>

        </div>

      `;


      elements.programGrid
        .appendChild(
          article
        );

    }
  );

}



/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown() {

  updateCountdown();


  countdownTimer =
    window.setInterval(
      updateCountdown,
      1000
    );

}



function updateCountdown() {

  const now =
    new Date();


  const difference =
    START_DATE.getTime() -
    now.getTime();


  if (
    difference <= 0
  ) {

    handleConferenceStarted(
      now
    );

    return;

  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (
        totalSeconds %
        86400
      ) /
      3600
    );


  const minutes =
    Math.floor(
      (
        totalSeconds %
        3600
      ) /
      60
    );


  const seconds =
    totalSeconds % 60;


  elements.days.textContent =
    pad(days);


  elements.hours.textContent =
    pad(hours);


  elements.minutes.textContent =
    pad(minutes);


  elements.seconds.textContent =
    pad(seconds);


  updateCountdownHorizon(
    now
  );

}



/* =========================================================
   COUNTDOWN HORIZON
========================================================= */

function updateCountdownHorizon(now) {

  /*
    Visual horizon:
    last 180 days before event.
  */

  const horizonStart =
    START_DATE.getTime() -
    180 * 24 * 60 * 60 * 1000;


  const total =
    START_DATE.getTime() -
    horizonStart;


  const elapsed =
    now.getTime() -
    horizonStart;


  const percentage =
    Math.max(
      0,
      Math.min(
        100,
        (elapsed / total) * 100
      )
    );


  elements.countdownProgress
    .style
    .width =
      `${percentage}%`;


  elements.countdownSun
    .style
    .left =
      `${percentage}%`;

}



/* =========================================================
   EVENT STARTED
========================================================= */

function handleConferenceStarted(now) {

  if (countdownTimer) {

    clearInterval(
      countdownTimer
    );


    countdownTimer =
      null;

  }


  elements.days.textContent =
    "00";


  elements.hours.textContent =
    "00";


  elements.minutes.textContent =
    "00";


  elements.seconds.textContent =
    "00";


  elements.countdownProgress
    .style
    .width =
      "100%";


  elements.countdownSun
    .style
    .left =
      "100%";


  if (
    now.getTime() <=
    END_DATE.getTime()
  ) {

    elements.countdownMessage.textContent =
      "The assembly is now in session.";

  } else {

    elements.countdownMessage.textContent =
      "This assembly has concluded.";

  }

}



/* =========================================================
   MAP
========================================================= */

function getMapUrl() {

  const custom =
    CONFERENCE.mapsUrl?.trim();


  if (custom) {
    return custom;
  }


  const query =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );

}



/* =========================================================
   LINKS
========================================================= */

function configureLinks() {

  const mapUrl =
    getMapUrl();


  elements.mapButton.href =
    mapUrl;


  elements.secondaryMapButton.href =
    mapUrl;


  const registration =
    CONFERENCE.registrationUrl?.trim();


  if (registration) {

    elements.registerButton.href =
      registration;

  } else {

    elements.registerButton.hidden =
      true;

  }


  const website =
    CONFERENCE.websiteUrl?.trim();


  if (website) {

    elements.websiteButton.href =
      website;

  } else {

    elements.websiteButton.hidden =
      true;

  }

}



/* =========================================================
   CALENDAR
========================================================= */

function downloadCalendar() {

  const location =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  const invitationUrl =
    getShareUrl();


  const description =
    [
      CONFERENCE.tagline,

      CONFERENCE.websiteUrl
        ? `Website: ${CONFERENCE.websiteUrl}`
        : "",

      invitationUrl
        ? `Invitation: ${invitationUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const content =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Horizon Assembly Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${createUID()}
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(START_DATE)}
DTEND:${formatICSDate(END_DATE)}
SUMMARY:${escapeICS(CONFERENCE.name)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(CONFERENCE.websiteUrl || invitationUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `${slugify(CONFERENCE.shortName)}.ics`;


  document.body.appendChild(
    link
  );


  link.click();

  link.remove();


  URL.revokeObjectURL(
    url
  );


  announce(
    "Calendar file downloaded."
  );

}



/* =========================================================
   ICS HELPERS
========================================================= */

function formatICSDate(date) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}Z$/,
      "Z"
    );

}



function createUID() {

  return (
    `${slugify(CONFERENCE.shortName)}` +
    `-${START_DATE.getTime()}` +
    "@horizon-assembly"
  );

}



function escapeICS(value = "") {

  return String(value)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /\n/g,
      "\\n"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    );

}



/* =========================================================
   SHARE
========================================================= */

async function shareInvitation() {

  const data = {

    title:
      CONFERENCE.name,

    text:
      `${CONFERENCE.name} — ${CONFERENCE.tagline}`,

    url:
      getShareUrl()

  };


  if (
    navigator.share
  ) {

    try {

      await navigator.share(
        data
      );


      announce(
        "Invitation shared."
      );


      return;

    } catch (error) {

      if (
        error.name ===
        "AbortError"
      ) {
        return;
      }

    }

  }


  await copyInvitationLink();

}



/* =========================================================
   COPY FALLBACK
========================================================= */

async function copyInvitationLink() {

  const url =
    getShareUrl();


  try {

    await navigator.clipboard
      .writeText(
        url
      );


    announce(
      "Invitation link copied."
    );

  } catch (error) {

    fallbackCopy(
      url
    );

  }

}



function fallbackCopy(text) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    text;


  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";


  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();


  try {

    document.execCommand(
      "copy"
    );


    announce(
      "Invitation link copied."
    );

  } catch (error) {

    announce(
      "Unable to copy link automatically."
    );

  }


  textarea.remove();

}



/* =========================================================
   SHARE URL
========================================================= */

function getShareUrl() {

  const custom =
    CONFERENCE.shareUrl?.trim();


  if (custom) {
    return custom;
  }


  return window.location.href;

}



/* =========================================================
   ACTIONS
========================================================= */

function setupActions() {

  elements.calendarButton
    .addEventListener(
      "click",
      downloadCalendar
    );


  elements.shareButton
    .addEventListener(
      "click",
      shareInvitation
    );


  elements.topShareButton
    .addEventListener(
      "click",
      shareInvitation
    );

}



/* =========================================================
   REVEAL
========================================================= */

function setupRevealObserver() {

  const items =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    prefersReducedMotion()
  ) {

    items.forEach(
      item =>
        item.classList.add(
          "is-visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target
              .classList
              .add(
                "is-visible"
              );


            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold:
          0.12,

        rootMargin:
          "0px 0px -7% 0px"
      }
    );


  items.forEach(
    item =>
      observer.observe(
        item
      )
  );

}



/* =========================================================
   METADATA
========================================================= */

function updateMetadata() {

  document.title =
    CONFERENCE.name;


  const description =
    `${CONFERENCE.name} — ${CONFERENCE.tagline}`;


  updateMeta(
    'meta[name="description"]',
    description
  );


  updateMeta(
    'meta[property="og:title"]',
    CONFERENCE.name
  );


  updateMeta(
    'meta[property="og:description"]',
    CONFERENCE.tagline
  );


  updateMeta(
    'meta[property="og:url"]',
    getShareUrl()
  );


  updateMeta(
    'meta[name="twitter:title"]',
    CONFERENCE.name
  );


  updateMeta(
    'meta[name="twitter:description"]',
    CONFERENCE.tagline
  );

}



function updateMeta(
  selector,
  content
) {

  const element =
    document.querySelector(
      selector
    );


  if (!element) {
    return;
  }


  element.setAttribute(
    "content",
    content
  );

}



/* =========================================================
   STRUCTURED DATA
========================================================= */

function addStructuredData() {

  const data = {

    "@context":
      "https://schema.org",

    "@type":
      "Event",

    name:
      CONFERENCE.name,

    description:
      CONFERENCE.tagline,

    startDate:
      CONFERENCE.startAt,

    endDate:
      CONFERENCE.endAt,

    eventStatus:
      "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    location: {

      "@type":
        "Place",

      name:
        CONFERENCE.venue,

      address: {

        "@type":
          "PostalAddress",

        addressLocality:
          CONFERENCE.city,

        addressCountry:
          CONFERENCE.country

      }

    },

    organizer: {

      "@type":
        "Organization",

      name:
        CONFERENCE.organizer,

      url:
        CONFERENCE.websiteUrl ||
        undefined

    },

    url:
      getShareUrl()

  };


  const script =
    document.createElement(
      "script"
    );


  script.type =
    "application/ld+json";


  script.textContent =
    JSON.stringify(
      data
    );


  document.head.appendChild(
    script
  );

}



/* =========================================================
   HELPERS
========================================================= */

function pad(number) {

  return String(number)
    .padStart(
      2,
      "0"
    );

}



function slugify(value = "") {

  return String(value)

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9]+/g,
      "-"
    )

    .replace(
      /^-+|-+$/g,
      ""
    );

}



function escapeHTML(value = "") {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}



function announce(message) {

  elements.statusMessage.textContent =
    "";


  window.setTimeout(
    () => {

      elements.statusMessage.textContent =
        message;

    },
    30
  );

}



function prefersReducedMotion() {

  return window
    .matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    .matches;

}



/* =========================================================
   INIT
========================================================= */

function init() {

  populateConference();

  renderProgram();

  setupAssembly();

  setupActions();

  setupRevealObserver();

  startCountdown();

}



document.addEventListener(
  "DOMContentLoaded",
  init
);
