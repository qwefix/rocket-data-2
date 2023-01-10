import c from "./style.module.scss";

const Spinner = ({ size }: { size: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderWidth: size / 8,
    }}
    className={c.loader}
  />
);

export default Spinner;
