export default function ModalFormPost({ closeModal }) {
  return (
    <div
      className="fixed inset-0 bg-neutral-800/50 midFlex text-neutral-50"
      onClick={closeModal}
    >
      <div
        className="relative w-4/5 max-w-[600px] px-10 py-8 mx-auto border-2 rounded-md  bg-neutral-900 border-neutral-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => closeModal()}
          className="absolute text-xl text-neutral-50 top-1 left-2"
        >
          X
        </button>
        <p className="text-3xl font-semi-bold">
          Dis nous tout !
        </p>
      </div>
    </div>
  );
}
