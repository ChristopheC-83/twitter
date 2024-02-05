// colonne de droite qui apparait si largeur écran > 1024px
// nous pourrions y mettre des liens vers des articles de blog, des pubs, des suggestions de personnes à suivre, etc.

export default function Blog() {
  // mettre en fixed si on ne veut pas que cette section descende au scroll
  return <div className="fixed top-0 h-full w-80">Blog</div>;
}
