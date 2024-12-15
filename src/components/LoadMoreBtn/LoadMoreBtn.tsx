import css from "./LoadMoreBtn.module.css";
interface BtnProps {
  onClick: () => void;
}
export default function LoadMoreBtn({ onClick }: BtnProps) {
  return (
    <div className={css.button}>
      <button className={css.btn} type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
}
