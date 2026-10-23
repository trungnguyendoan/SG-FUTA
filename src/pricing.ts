/**
 * SG FUTA TRAVEL - BỘ TÍNH TOÁN BÁNG GIÁ THUÊ XE TỰ ĐỘNG
 * Phục vụ mục đích giải trình thuật toán môn Tin học & nghiệp vụ thực tế.
 */

export interface PricingParams {
  route: string;       // 'sg-vt' | 'sg-pt' | 'sg-dl'
  vehicleType: string; // '9' | '16' | '34' | '45'
  seatType: string;    // 'chair' (Ghế ngồi) | 'sleeper' (Giường nằm)
  duration: string;    // 'day' | '2d1n' | '3d2n' | '4d3n' | 'other'
  quantity: number;    // 1 -> 10
}

export interface PricingResult {
  isValid: boolean;
  unitPrice: number;     // Đơn giá 1 xe (VNĐ)
  totalPrice: number;    // Tổng thành tiền = unitPrice * quantity
  formattedUnitPrice: string;
  formattedTotalPrice: string;
  message?: string;      // Thông báo khi cần liên hệ hotline
}

/**
 * Hàm tra cứu và tính toán giá thuê xe du lịch
 * @param params {PricingParams} Các lựa chọn của người dùng
 * @returns {PricingResult} Kết quả tính toán kèm định dạng tiền tệ Việt Nam
 */
export function calculateRentalPrice(params: PricingParams): PricingResult {
  const { route, vehicleType, seatType, duration, quantity } = params;

  // 1. Kiểm tra nếu người dùng chọn thời gian "Khác" hoặc số lượng xe không hợp lệ
  if (duration === 'other' || !quantity || quantity < 1 || quantity > 10) {
    return {
      isValid: false,
      unitPrice: 0,
      totalPrice: 0,
      formattedUnitPrice: '0 đ',
      formattedTotalPrice: 'Liên Hệ Với Chúng Tôi qua Hotline: 1900 996646',
      message: 'Vui lòng liên hệ Hotline: 1900 996646 để nhận báo giá theo yêu cầu riêng.'
    };
  }

  // 2. Xe 9 chỗ không có phiên bản giường nằm
  if (vehicleType === '9' && seatType === 'sleeper') {
    return {
      isValid: false,
      unitPrice: 0,
      totalPrice: 0,
      formattedUnitPrice: '0 đ',
      formattedTotalPrice: 'Liên Hệ Với Chúng Tôi qua Hotline: 1900 996646',
      message: 'Xe 9 chỗ chỉ có phiên bản ghế ngồi Limousine cao cấp.'
    };
  }

  let basePrice: number | null = null;

  // 3. Phân nhánh tính giá theo từng phân khúc xe
  switch (vehicleType) {
    case '9': {
      // Xe 9 chỗ (chỉ có ghế ngồi)
      if (route === 'sg-vt') {
        if (duration === 'day') basePrice = 2_000_000;
        else if (duration === '2d1n') basePrice = 4_500_000;
        else if (duration === '3d2n') basePrice = 8_000_000;
      } else if (route === 'sg-pt') {
        if (duration === 'day') basePrice = 3_000_000;
        else if (duration === '2d1n') basePrice = 6_000_000;
        else if (duration === '3d2n') basePrice = 8_000_000;
      } else if (route === 'sg-dl') {
        if (duration === '2d1n') basePrice = 8_000_000;
        else if (duration === '3d2n') basePrice = 12_000_000;
        else if (duration === '4d3n') basePrice = 14_000_000;
      }
      break;
    }

    case '16': {
      // Xe 16 chỗ
      // Giá cơ sở (ghế ngồi)
      if (route === 'sg-vt') {
        if (duration === 'day') basePrice = 3_000_000;
        else if (duration === '2d1n') basePrice = 4_500_000;
        else if (duration === '3d2n') basePrice = 5_000_000;
      } else if (route === 'sg-pt') {
        if (duration === 'day') basePrice = 3_500_000;
        else if (duration === '2d1n') basePrice = 5_000_000;
        else if (duration === '3d2n') basePrice = 5_500_000;
      } else if (route === 'sg-dl') {
        if (duration === '2d1n') basePrice = 6_000_000;
        else if (duration === '3d2n') basePrice = 8_000_000;
        else if (duration === '4d3n') basePrice = 11_000_000;
      }

      // Nếu có giá và chọn giường nằm: cộng thêm 2.000.000 VNĐ
      if (basePrice !== null && seatType === 'sleeper') {
        basePrice += 2_000_000;
      }
      break;
    }

    case '34': {
      // Xe 34 chỗ
      if (route === 'sg-vt') {
        if (duration === 'day') basePrice = 5_000_000;
        else if (duration === '2d1n') basePrice = 8_000_000;
        else if (duration === '3d2n') basePrice = 9_500_000;

        if (basePrice !== null && seatType === 'sleeper') {
          basePrice += 2_000_000;
        }
      } else if (route === 'sg-pt') {
        if (duration === 'day') basePrice = 5_500_000;
        else if (duration === '2d1n') basePrice = 10_000_000;
        else if (duration === '3d2n') basePrice = 13_500_000;

        if (basePrice !== null && seatType === 'sleeper') {
          basePrice += 2_000_000;
        }
      } else if (route === 'sg-dl') {
        // Tuyến SG - Đà Lạt có bảng giá ghế / giường riêng biệt
        if (duration === '2d1n') {
          basePrice = seatType === 'sleeper' ? 15_000_000 : 10_000_000;
        } else if (duration === '3d2n') {
          basePrice = seatType === 'sleeper' ? 19_000_000 : 13_000_000;
        } else if (duration === '4d3n') {
          basePrice = seatType === 'sleeper' ? 21_000_000 : 18_000_000;
        }
      }
      break;
    }

    case '45': {
      // Xe 45 chỗ (hoặc 54 chỗ)
      if (route === 'sg-vt') {
        if (duration === 'day') basePrice = 5_000_000;
        else if (duration === '2d1n') basePrice = 7_000_000;
        else if (duration === '3d2n') basePrice = 9_000_000;

        if (basePrice !== null && seatType === 'sleeper') {
          basePrice += 2_000_000;
        }
      } else if (route === 'sg-pt') {
        if (duration === 'day') basePrice = 9_000_000;
        else if (duration === '2d1n') basePrice = 10_000_000;
        else if (duration === '3d2n') basePrice = 13_000_000;

        if (basePrice !== null && seatType === 'sleeper') {
          basePrice += 2_000_000;
        }
      } else if (route === 'sg-dl') {
        // Tuyến SG - Đà Lạt bảng giá ghế / giường riêng biệt
        if (duration === '2d1n') {
          basePrice = seatType === 'sleeper' ? 13_000_000 : 10_000_000;
        } else if (duration === '3d2n') {
          basePrice = seatType === 'sleeper' ? 15_000_000 : 13_000_000;
        } else if (duration === '4d3n') {
          basePrice = seatType === 'sleeper' ? 19_000_000 : 16_000_000;
        }
      }
      break;
    }

    default:
      basePrice = null;
  }

  // 4. Nếu kết hợp không hợp lệ (ví dụ SG - Đà Lạt trong ngày, hoặc 4N3Đ đi Vũng Tàu không có trong biểu phí chuẩn)
  if (basePrice === null) {
    return {
      isValid: false,
      unitPrice: 0,
      totalPrice: 0,
      formattedUnitPrice: '0 đ',
      formattedTotalPrice: 'Liên Hệ Với Chúng Tôi qua Hotline: 1900 996646',
      message: 'Tùy chọn chưa có biểu phí tự động cố định. Vui lòng liên hệ Hotline: 1900 996646 để được tư vấn giá tốt nhất.'
    };
  }

  // 5. Tính thành tiền = Đơn giá x Số lượng xe
  const unitPrice = basePrice;
  const totalPrice = unitPrice * quantity;

  // Định dạng số tiền kiểu Việt Nam (ví dụ: 12.000.000 đ)
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  return {
    isValid: true,
    unitPrice,
    totalPrice,
    formattedUnitPrice: formatVND(unitPrice),
    formattedTotalPrice: formatVND(totalPrice),
  };
}
