interface IRegister {
  fullname: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  academy: { name: string };
}

interface ILogin {
  username: string;
  password: string;
}

interface IAcademy {
  id: number;
  name: string;
  logo: string;
  active: boolean;
}

type ISubject = {
  id: number;
  name: string;
  academy: number;
};

type MangeUsers = {
  id: number;
  username: string;
  is_active: boolean;
  email: string;
  fullname: string;
};

type Outcome = {
  id: number;
  subject: number;
  text: string;
};

type Topic = {
  id: number;
  name: string;
  subject: number;
  outcomes: number[];
};

type CountState = {
  academy_count: number;
  exam_count: number;
  question_count: number;
  subject_count: number;
  topic_count: number;
  user_count: number;
};

type Privilege = {
  id: number;
  object_pk: string;
  user: number;
  fullname: string;
  permission: number;
  perm: string;
};

type Answer = {
  id: number;
  text: string;
  isPerfectAns: boolean;
};

type Setting = {
  active: boolean;
  periodOfTime: string;
  type: number;
  level: number;
  rondomnizable: boolean;
  createdBy: string;
  topic: number;
};

type Question = {
  id: number;
  text: string;
  hint: string;
  image: string;
  setting: Setting;
  answers: Answer[];
};

type ExamSetting = {
  id: number;
  marks: number;
  subject: number;
  updatedAt: string;
  createdAt: string;
  periodOfTime: string;
  generation_config: string;
  level: number;
  academy: number;
};

export type Exam = {
  id: number;
  name: string;
  confirmed: boolean;
  academy_name: string;
  academy_logo: string;
  questions: {
    id: number;
    text: string;
    answers: { id: number; text: string; isPerfectAns: boolean }[];
  }[];
  setting: ExamSetting;
};

type Documents = {
  id: number;
  name: string;
  file: string;
  subject: number;
};
