import { Request, Response, NextFunction } from "express";
import VoucherService from "../services/VoucherService";

class VoucherController {
  private static instance: VoucherController;

  constructor() {
    if (VoucherController.instance) {
      return VoucherController.instance;
    }
    VoucherController.instance = this;
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vouchers = await VoucherService.viewAll();
      res.json(vouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const voucherId: string = req.params.id;
      const voucher = await VoucherService.view(voucherId);
      res.json(voucher);
    } catch (error) {
      console.error("Error fetching voucher:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newVoucher = req.body;
      const voucher = await VoucherService.create(newVoucher);
      res.status(201).json(voucher);
    } catch (error) {
      console.error("Error creating voucher:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const voucherId: string = req.params.id;
      const updateData = req.body;
      const voucher = await VoucherService.update(voucherId, updateData);
      res.status(200).json(voucher);
    } catch (error) {
      console.error("Error updating voucher:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const voucherId: string = req.params.id;
      await VoucherService.delete(voucherId);
      res.status(200).json({ message: "Voucher deleted successfully" });
    } catch (error) {
      console.error("Error deleting voucher:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new VoucherController();
Object.freeze(instance);

export default instance;