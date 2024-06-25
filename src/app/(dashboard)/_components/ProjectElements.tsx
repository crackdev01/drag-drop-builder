import { CheckBoxFieldFormElement } from "~/components/fields/CheckboxField";
import { DateFieldFormElement } from "~/components/fields/DateField";
import { NumberFieldFormElement } from "~/components/fields/NumberField";
import { ParagraphFieldFormElement } from "~/components/fields/ParagraphField";
import { SelectFieldFormElement } from "~/components/fields/SelectField";
import { SeparatorFieldFormElement } from "~/components/fields/SeperatorField";
import { SpacerFieldFormElement } from "~/components/fields/SpacerField";
import { SubTitleFieldFormElement } from "~/components/fields/SubTitleField";
import { TextFieldFormElement } from "~/components/fields/TextField";
import { TextAreaFieldFormElement } from "~/components/fields/TextareaField";
import { TitleFieldFormElement } from "~/components/fields/TitleField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeperatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type SubmitFunction = (key: string, value: string) => void;

export type ProjectElement = {
  type: ElementsType;

  construct: (id: string) => ProjectElementInstance;

  designerBtnElement: {
    icon: React.ReactNode;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: ProjectElementInstance;
  }>;
  projectComponent: React.FC<{
    elementInstance: ProjectElementInstance;
    submitFunction?: SubmitFunction;
    isInvalid?: boolean;
    defaultValues?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: ProjectElementInstance;
    updateElement: (id: string, element: ProjectElementInstance) => void;
  }>;

  validate: (
    formElement: ProjectElementInstance,
    currentValue: string,
  ) => boolean;
};

export type ProjectElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type ProjectElementsType = {
  [key in ElementsType]: ProjectElement;
};

export const ProjectElements: ProjectElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeperatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckBoxFieldFormElement,
};
