import { db } from "../../config/db";
import { Voucher } from "../../../db/schema";
import { VoucherModel } from "../models/model";
import { eq } from "drizzle-orm";

class VoucherRepo {
  private static instance: VoucherRepo;

  constructor() {
    if (VoucherRepo.instance) {
      return VoucherRepo.instance;
    }
    VoucherRepo.instance = this;
  }

  async findAll() {
    try {
      const vouchers = await db.select().from(Voucher);
      return vouchers;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findById(voucherId: string) {
    try {
      const voucher = await db.select().from(Voucher).where(eq(Voucher.id, voucherId));
      return voucher;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(newVoucher: VoucherModel) {
    try {
      const voucher = await db
        .insert(Voucher)
        .values({
          ...newVoucher
        })
        .returning({ insertedId: Voucher.id, code: Voucher.code });
      return voucher;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(voucherId: string) {
    try {
      const voucher = await db
        .delete(Voucher)
        .where(eq(Voucher.id, voucherId))
        .returning({ id: Voucher.id, code: Voucher.code });
      return voucher;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(voucherId: string, updatedColumns: VoucherModel) {
    try {
      const voucher = await db
        .update(Voucher)
        .set({ ...updatedColumns })
        .where(eq(Voucher.id, voucherId))
        .returning();
      return voucher;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const instance = new VoucherRepo();
Object.freeze(instance);

export default instance;