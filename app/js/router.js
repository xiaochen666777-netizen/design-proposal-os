
window.Router = {
   navigate(page) {
     window.AppState.currentPage = page;
     window.App.render();
     window.scrollTo(0, 0);
   }
};
