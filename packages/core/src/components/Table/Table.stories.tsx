import { StoryFn, Meta } from "@storybook/react";
import { Table } from ".";

export default {
  title: "Core/Table",
  component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />;

export const defaultTable = Template.bind({});
defaultTable.args = {
  headerList: ["전기", "불", "물", "풀"],
  striped: true,
  draggable: false,
  tableData: [
    {
      electric: { cell: "피츄", sortTarget: "피츄" },
      fire: { cell: "파이리", sortTarget: "파이리" },
      water: { cell: "꼬부기", sortTarget: "꼬부기" },
      leaf: { cell: "이상해씨", sortTarget: "이상해씨" },
    },
    {
      electric: { cell: "피카츄", sortTarget: "피카츄" },
      fire: { cell: "리자드", sortTarget: "리자드" },
      water: { cell: "어니부기", sortTarget: "어니부기" },
      leaf: { cell: "이상해풀", sortTarget: "이상해풀" },
    },
    {
      electric: { cell: "라이츄", sortTarget: "라이츄" },
      fire: { cell: "리자몽", sortTarget: "리자몽" },
      water: { cell: "거북왕", sortTarget: "거북왕" },
      leaf: { cell: "이상해꽃", sortTarget: "이상해꽃" },
    },
    {
      electric: { cell: "찌리리공", sortTarget: "찌리리공" },
      fire: { cell: "식스테일", sortTarget: "식스테일" },
      water: { cell: "갸라도스", sortTarget: "갸라도스" },
      leaf: { cell: "뚜벅초", sortTarget: "뚜벅초" },
    },
  ],
};

export const sortableTable = Template.bind({});
sortableTable.args = {
  headerList: ["전기", "불", "물", "풀", "순번", "선택(정렬테스트용)"],
  striped: true,
  sortable: true,
  tableData: [
    {
      electric: { cell: "피츄", sortTarget: "피츄" },
      fire: { cell: "파이리", sortTarget: "파이리" },
      water: { cell: "꼬부기", sortTarget: "꼬부기" },
      leaf: { cell: "이상해씨", sortTarget: "이상해씨" },
      num: { cell: 1, sortTarget: 1 },
      select: {
        cell: <input type="checkbox" readOnly checked={true} />,
        sortTarget: true,
      },
    },
    {
      electric: { cell: "피카츄", sortTarget: "피카츄" },
      fire: { cell: "리자드", sortTarget: "리자드" },
      water: { cell: "어니부기", sortTarget: "어니부기" },
      leaf: { cell: "이상해풀", sortTarget: "이상해풀" },
      num: { cell: 2, sortTarget: 2 },
      select: {
        cell: <input type="checkbox" readOnly checked={false} />,
        sortTarget: false,
      },
    },
    {
      electric: { cell: "라이츄", sortTarget: "라이츄" },
      fire: { cell: "리자몽", sortTarget: "리자몽" },
      water: { cell: "거북왕", sortTarget: "거북왕" },
      leaf: { cell: "이상해꽃", sortTarget: "이상해꽃" },
      num: { cell: 3, sortTarget: 3 },
      select: {
        cell: <input type="checkbox" readOnly checked={true} />,
        sortTarget: true,
      },
    },
    {
      electric: { cell: "찌리리공", sortTarget: "찌리리공" },
      fire: { cell: "식스테일", sortTarget: "식스테일" },
      water: { cell: "갸라도스", sortTarget: "갸라도스" },
      leaf: { cell: "뚜벅초", sortTarget: "뚜벅초" },
      num: { cell: 4, sortTarget: 4 },
      select: {
        cell: <input type="checkbox" readOnly checked={false} />,
        sortTarget: false,
      },
    },
  ],
};

export const draggableTable = Template.bind({});
draggableTable.args = {
  headerList: ["전기", "불", "물", "풀"],
  striped: true,
  sortable: false,
  draggable: true,
  onDragEnd: (rows) => {
    console.log(rows);
  },
  tableData: [
    {
      electric: { cell: "피츄", sortTarget: "피츄", dndId: 0 },
      fire: { cell: "파이리", sortTarget: "파이리" },
      water: { cell: "꼬부기", sortTarget: "꼬부기" },
      leaf: { cell: "이상해씨", sortTarget: "이상해씨" },
    },
    {
      electric: { cell: "피카츄", sortTarget: "피카츄", dndId: 1 },
      fire: { cell: "리자드", sortTarget: "리자드" },
      water: { cell: "어니부기", sortTarget: "어니부기" },
      leaf: { cell: "이상해풀", sortTarget: "이상해풀" },
    },
    {
      electric: { cell: "라이츄", sortTarget: "라이츄", dndId: 2 },
      fire: { cell: "리자몽", sortTarget: "리자몽" },
      water: { cell: "거북왕", sortTarget: "거북왕" },
      leaf: { cell: "이상해꽃", sortTarget: "이상해꽃" },
    },
    {
      electric: { cell: "찌리리공", sortTarget: "찌리리공", dndId: 3 },
      fire: { cell: "식스테일", sortTarget: "식스테일" },
      water: { cell: "갸라도스", sortTarget: "갸라도스" },
      leaf: { cell: "뚜벅초", sortTarget: "뚜벅초" },
    },
  ],
};
