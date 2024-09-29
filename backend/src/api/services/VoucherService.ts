import { VoucherModel } from "../models/model";
import VoucherRepo from "../repos/VoucherRepo";

class VoucherService {
  private static instance: VoucherService;

  constructor() {
    if (VoucherService.instance) {
      return VoucherService.instance;
    }
    VoucherService.instance = this;
  }

  async create(newVoucher: VoucherModel) {
    try {
      const voucher = await VoucherRepo.create(newVoucher);
      return voucher;
    } catch (error) {
      console.error("Error creating voucher:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll() {
    try {
      const vouchers = await VoucherRepo.findAll();
      return vouchers;
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      throw new Error("Internal server error");
    }
  }

  async view(voucherId: string) {
    try {
      const voucher = await VoucherRepo.findById(voucherId);
      return voucher;
    } catch (error) {
      console.error("Error fetching voucher:", error);
      throw new Error("Internal server error");
    }
  }

  async update(voucherId: string, updateData: VoucherModel) {
    try {
      const voucher = await VoucherRepo.update(voucherId, updateData);
      return voucher;
    } catch (error) {
      console.error("Error updating voucher:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(voucherId: string) {
    try {
      await VoucherRepo.delete(voucherId);
    } catch (error) {
      console.error("Error deleting voucher:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new VoucherService();
Object.freeze(instance);

export default instance;