// colonne de droite qui apparait si largeur écran > 1024px

export default function Blog() {
  // mettre en fixed si on ne veut pas que cette section descende au scroll
  return <div className="absolute top-0 h-full bg-blue-700 w-80">Blog</div>;
}
