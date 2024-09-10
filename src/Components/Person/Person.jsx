import { useState } from "react";

const init = { name: "", age: 0 };

const Person = () => {
  const [person, setPerson] = useState({ ...init });
  const [people, setPeople] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // 수정할 항목의 인덱스 관리

  // 이름, 나이 정렬
  const sortByName = () => {
    const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name));
    setPeople(sorted);
  };

  const sortByAge = () => {
    const sorted = [...people].sort((a, b) => a.age - b.age);
    setPeople(sorted);
  };

  const onChangePerson = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const onSubmit = () => {
    if (editingIndex === null) {
      // 새로운 데이터 등록
      setPeople([...people, person]);
    } else {
      // 기존 데이터 수정
      const updatedPeople = people.map((p, index) =>
        index === editingIndex ? person : p // 해당 인덱스의 항목만 수정
      );
      setPeople(updatedPeople);
    }
    setPerson({ ...init }); // 입력 필드 초기화
    setEditingIndex(null);  // 수정 모드 종료
  };

  const onEdit = (index) => {
    const personToEdit = people[index]; // 수정할 데이터 가져오기
    setPerson(personToEdit);            // 입력 필드에 수정할 데이터 설정
    setEditingIndex(index);             // 수정할 항목의 인덱스 설정
  };

  const onRemove = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index); // 해당 인덱스를 제외한 배열 생성
    setPeople(updatedPeople);
    setEditingIndex(null); // 삭제 후 수정 모드 종료
  };

  return (
    <div>
      <input
        name="name"
        value={person.name}
        onChange={onChangePerson}
        placeholder="이름"
      />
      <input
        name="age"
        type="number"
        value={person.age}
        onChange={onChangePerson}
        placeholder="나이"
      />
      <button onClick={onSubmit}>
        {editingIndex === null ? "등록" : "수정"}
      </button>
      <input
        placeholder="검색"
        onChange={(e) => {
          const searchValue = e.target.value;
          setPeople(
            people.filter(({ name }) => name.includes(searchValue))
          );
        }}
      />
      <table border={5}>
        <thead>
          <tr>
            <td onClick={sortByName}>name</td>
            <td onClick={sortByAge}>age</td>
            <td>수정</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {people.map(({ name, age }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{age}</td>
              <td>
                <button onClick={() => onEdit(index)}>수정</button>
              </td>
              <td>
                <button onClick={() => onRemove(index)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Person;
