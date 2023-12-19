# Pick & Pack By EuroCotton Ecommerce

## React + Vite + Tailwind CSS + Daisy UI

This is a PWA Project developed with React, Tailwind CSS, and Daisy UI(tailwind library) for UI components like buttons, menus, cards, tables, themes etc.

**Routing**

Page routing is powered by the **react-router-dom** package. The main file is in **/routes/Router.jsx**, where you can find all the app's routes and the component that renders each route.

**Components**

Inside the **/components** folder, you'll find all the reusable components for the project. "Small" components are helpful for maintaining an organized project.

1. Scanner: This component is supposed to be called when the picker starts to pick and **scan** items. List all the products to be picked with their respective information (quantity, name, etc.).

**Global Context**

At certaing point we may gotta use a global context, so I've decided to install the **zustand** library 'cause is easier to use than Redux, i guess...
but if you have a better option fell free to share it.
