import React, { useState } from "react";
import { default as ReactSelect } from "react-select";

// plugins
import { Form } from "react-bootstrap";

// components
import { FilmCharacter } from "../../types";

export type CharacterSelectOption = FilmCharacter & {
  value: string;
  label?: string;
};

type CharacterSelectProps = {
  options: Array<CharacterSelectOption>;
  onChangeCharacter: (value: CharacterSelectOption | null | undefined) => void;
};
const CharacterSelect = ({
  options,
  onChangeCharacter,
}: CharacterSelectProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<
    CharacterSelectOption | null | undefined
  >(null);

  return (
    <Form>
      {/* character select */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="fw-bold">Character</Form.Label>
        <ReactSelect
          value={selectedCharacter}
          onChange={(value: CharacterSelectOption | null | undefined) => {
            setSelectedCharacter(value);
            onChangeCharacter(value);
          }}
          options={options}
        />
      </Form.Group>
    </Form>
  );
};

export { CharacterSelect };
