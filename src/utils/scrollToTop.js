//  Au changement d epage, permet de remonter en haut de page avec douceur.... smooth !

export default function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
}