export default function Select({
  children: options = [
    { id: "01", description: "Opcao 1" },
    { id: "01", description: "Opcao 2" },
  ],
  labelDescription = "Escolha uma opcao abaixo",
  selectValue = "a1",
  onSelectedChange = null,
}) {
  function HandleSelectedChange({ currentTarget }) {
    if (onSelectedChange) {
      const newValue = currentTarget.value;
      onSelectedChange(newValue);
    }
  }

  return (
    <>
      <p>{labelDescription}</p>
      <select
        className="shadow-md rounded-sm"
        value={selectValue}
        onChange={HandleSelectedChange}
      >
        {options.map(({ id, description }) => {
          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>
    </>
  );
}
