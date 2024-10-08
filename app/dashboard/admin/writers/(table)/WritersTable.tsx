"use client";

import { TableColumns, WritersTableData } from "@/schema/UI";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import TableActions from "./TableActions";
import { convertToJalali } from "@/utils";
const columns: TableColumns[] = [
  {
    key: "id_number",
    label: "#",
  },
  {
    key: "name",
    label: "نام",
  },
  {
    key: "role",
    label: "سمت",
  },
  {
    key: "email",
    label: "ایمیل",
  },
  {
    key: "phone_number",
    label: "شماره تماس",
  },
  {
    key: "status",
    label: "وضعیت",
  },
  {
    key: "sign_up_date",
    label: "تاریخ ثبت نام",
  },
  {
    key: "actions",
    label: "اکشن ها",
  },
];



const WritersTable = ({ writers }: { writers: WritersTableData[] }) => {
  return (
    <Table shadow="sm" border={1}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={<div>empty</div>}>
        {writers.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.first_name + " " + item.last_name}</TableCell>
            <TableCell>
              <Chip color="primary" variant="flat">
                {item.role_id ? (
                  "نویسنده"
                ) : (
                  <Chip className="animate-pulse" color="warning" variant="dot">
                    بدون سمت
                  </Chip>
                )}
              </Chip>
            </TableCell>
            <TableCell>
              {item.email ? (
                item.email
              ) : (
                <Chip className="animate-pulse" color="danger" variant="dot">
                  عدم تکمیل اطلاعات
                </Chip>
              )}
            </TableCell>
            <TableCell>
              {item.phone_number ? (
                item.phone_number
              ) : (
                <Chip className="animate-pulse" color="warning" variant="dot">
                  بدون شماره
                </Chip>
              )}
            </TableCell>
            <TableCell className="flex gap-2">
              {item.is_active ? (
                <Chip color="success" variant="shadow" className="text-white">
                  فعال
                </Chip>
              ) : (
                <Chip color="danger" variant="shadow">
                  غیرفعال
                </Chip>
              )}
              {item.is_verified ? (
                <Chip color="success" variant="shadow" className="text-white">
                  تایید شده
                </Chip>
              ) : (
                <Chip color="danger" variant="shadow">
                  تایید نشده
                </Chip>
              )}
            </TableCell>
            <TableCell>{convertToJalali(item.created_at)}</TableCell>
            <TableCell>
              <TableActions
                id={item.id}
                name={item.first_name + " " + item.last_name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WritersTable;
