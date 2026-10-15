package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.OrderResponse;
import com.ecommerce.backend.dto.ProductResponse;
import com.ecommerce.backend.service.AuthService;
import com.ecommerce.backend.service.OrderService;
import com.ecommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final OrderService orderService;
    private final ProductService productService;
    private final AuthService authService;

    @GetMapping("/stats/dashboard")
    public DashboardStatsResponse getDashboardStats() {
        long totalProducts = productService.countProducts();
        long totalOrders = orderService.countOrders();
        long totalUsers = authService.countUsers();
        BigDecimal totalRevenue = orderService.sumTotalRevenue();

        return new DashboardStatsResponse(
                totalProducts,
                totalOrders,
                totalUsers,
                totalRevenue,
                orderService.getRecentOrders(5),
                productService.getPopularProducts(5)
        );
    }

    public record DashboardStatsResponse(
            long totalProducts,
            long totalOrders,
            long totalUsers,
            BigDecimal totalRevenue,
            List<OrderResponse> recentOrders,
            List<ProductResponse> popularProducts
    ) {}
}
