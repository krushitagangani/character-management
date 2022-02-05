import React from "react";

// plugins
import { Form } from "react-bootstrap";

// components
import CustomSelect from "../../components/CustomSelect";
interface CharacterSelectProps {
  selectedCharacter: object | null | undefined;
  characterOpts: Array<object>;
  onChangeCharacter: (value: object | null | undefined) => void;
}
const CharacterSelect = ({
  selectedCharacter,
  characterOpts,
  onChangeCharacter,
}: CharacterSelectProps) => {
  return (
    <Form>
      {/* character select */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Character:</Form.Label>
        <CustomSelect
          value={selectedCharacter}
          onChange={onChangeCharacter}
          options={characterOpts}
        />
      </Form.Group>
    </Form>
  );
};

export default CharacterSelect;
