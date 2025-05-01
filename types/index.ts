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

type PrivilegeGroup = {
  name: [
    {
      fullname: string;
      id: number;
      object_pk: string;
      perm: string;
      permission: number;
      user: number;
    },
  ];
};
