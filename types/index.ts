export interface IRegister {
  fullname: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  academy: { name: string };
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IAcademy {
  id: number;
  name: string;
  logo: string;
  active: boolean;
}

export type ISubject = {
  id: number;
  name: string;
  academy: number;
};

export type MangeUsers = {
  id: number;
  username: string;
  is_active: boolean;
  email: string;
  fullname: string;
};

export type Outcome = {
  id: number;
  subject: number;
  text: string;
};

export type Topic = {
  id: number;
  name: string;
  subject: number;
  outcomes: number[];
};

export type CountState = {
  academy_count: number;
  exam_count: number;
  question_count: number;
  subject_count: number;
  topic_count: number;
  user_count: number;
};

export type Privilege = {
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
  periodOfTime: number;
  type: number;
  level: number;
  rondomnizable: boolean;
  createdBy: string;
  topic: number;
};

export type Question = {
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

export type Documents = {
  id: number;
  name: string;
  file: string;
  subject: number;
};

export type JwtDecode = {
  adm: boolean;
  aid: number;
};

export interface UserPermission {
  id: number;
  username: string;
  fullname: string;
  is_active: boolean;
  is_superuser: boolean;
  user_permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export type PermissionNested = {
  model: string;
  permissions: Permission[];
};
