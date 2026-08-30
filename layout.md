<!-- Design System -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "glass-border": "rgba(255, 255, 255, 0.3)",
                      "on-tertiary-container": "#ffceb1",
                      "on-secondary": "#122f5f",
                      "primary-container": "#255cb1",
                      "on-surface": "#e2e2ea",
                      "tertiary-fixed-dim": "#ffb688",
                      "inverse-surface": "#e2e2ea",
                      "on-tertiary-fixed-variant": "#733500",
                      "deep-navy": "#001a41",
                      "outline": "#8d909d",
                      "on-secondary-fixed-variant": "#2c4677",
                      "expense-rose": "#ba1a1a",
                      "background": "#111319",
                      "on-tertiary-fixed": "#311300",
                      "secondary-fixed-dim": "#adc6ff",
                      "on-tertiary": "#512400",
                      "secondary": "#adc6ff",
                      "error-container": "#93000a",
                      "primary": "#adc6ff",
                      "on-primary": "#002e69",
                      "on-secondary-fixed": "#001a42",
                      "surface-bright": "#37393f",
                      "on-secondary-container": "#9cb5ed",
                      "inverse-primary": "#255cb1",
                      "surface-container-low": "#191b21",
                      "inverse-on-surface": "#2e3036",
                      "surface-container-highest": "#33353b",
                      "primary-fixed": "#d8e2ff",
                      "surface-container-lowest": "#0c0e13",
                      "surface-variant": "#33353b",
                      "surface-tint": "#adc6ff",
                      "surface-container-high": "#282a30",
                      "surface": "#111319",
                      "tertiary-fixed": "#ffdbc7",
                      "primary-fixed-dim": "#adc6ff",
                      "on-primary-fixed": "#001a41",
                      "tertiary-container": "#974800",
                      "error": "#ffb4ab",
                      "on-error-container": "#ffdad6",
                      "on-error": "#690005",
                      "glass-bg": "rgba(255, 255, 255, 0.05)",
                      "on-background": "#e2e2ea",
                      "growth-cyan": "#49da9f",
                      "on-primary-fixed-variant": "#004493",
                      "on-primary-container": "#c8d8ff",
                      "secondary-container": "#2c4677",
                      "surface-dim": "#111319",
                      "on-surface-variant": "#c3c6d4",
                      "outline-variant": "#424752",
                      "secondary-fixed": "#d8e2ff",
                      "tertiary": "#ffb688",
                      "surface-container": "#1d2025",
                      "glass-highlight": "rgba(255, 255, 255, 0.15)"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "section-gap": "40px",
                      "unit": "4px",
                      "card-padding": "24px",
                      "margin-mobile": "20px",
                      "gutter": "24px"
              },
              "fontFamily": {
                      "headline-lg": ["manrope"],
                      "display-lg": ["manrope"],
                      "display-lg-mobile": ["manrope"],
                      "label-caps": ["manrope"],
                      "body-lg": ["manrope"],
                      "headline-md": ["manrope"],
                      "body-md": ["manrope"],
                      "data-mono": ["manrope"]
              },
              "fontSize": {
                      "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "500"}]
              }
            }
          }
        }
    </script>
<style>
        body {
            background-color: theme('colors.background');
            background-image: radial-gradient(circle at top right, rgba(37, 92, 177, 0.15), transparent 40%),
                              radial-gradient(circle at bottom left, rgba(73, 218, 159, 0.1), transparent 40%);
            background-attachment: fixed;
            color: theme('colors.on-surface');
        }
        
        .glass-card {
            background-color: theme('colors.glass-bg');
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .glass-card:hover {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        .glass-button {
            background-color: rgba(173, 198, 255, 0.4);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.15);
        }
        
        .glass-button:hover {
            background-color: rgba(173, 198, 255, 0.6);
        }

        .divider {
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
        }

        .progress-bar-bg {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 9999px;
            overflow: hidden;
        }

        .progress-bar-fill {
            background-color: theme('colors.primary');
            height: 100%;
            border-radius: 9999px;
        }
        
        .progress-bar-fill.warning {
            background-color: theme('colors.tertiary');
        }

        .progress-bar-fill.danger {
            background-color: theme('colors.expense-rose');
        }
    </style>
</head>
<body class="min-h-screen flex text-on-surface">
<!-- SideNavBar -->
<nav class="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-glass-bg backdrop-blur-[5px] border-r border-glass-border shadow-2xl transition-all duration-300 ease-in-out p-6 gap-section-gap z-50">
<!-- Header -->
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-[inset_1px_1px_0_rgba(255,255,255,0.2)]">
<span class="material-symbols-outlined text-primary font-display-lg text-headline-md" style="font-variation-settings: 'FILL' 1;">spa</span>
</div>
<div>
<h1 class="font-display-lg text-headline-md text-primary tracking-tight">Aura Finance</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant">Premium Tracking</p>
</div>
</div>
<!-- Main Nav -->
<ul class="flex flex-col gap-2 flex-grow">
<li>
<a class="flex items-center gap-3 p-3 text-primary bg-glass-highlight rounded-xl font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
                    Dashboard
                </a>
</li>
<li>
<a class="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl font-label-caps text-label-caps hover:bg-glass-highlight hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">account_balance_wallet</span>
                    Accounts
                </a>
</li>
<li>
<a class="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl font-label-caps text-label-caps hover:bg-glass-highlight hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">receipt_long</span>
                    Transactions
                </a>
</li>
<li>
<a class="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl font-label-caps text-label-caps hover:bg-glass-highlight hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">category</span>
                    Categories
                </a>
</li>
<li>
<a class="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl font-label-caps text-label-caps hover:bg-glass-highlight hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">savings</span>
                    Budgets
                </a>
</li>
</ul>
<!-- CTA & Footer -->
<div class="mt-auto flex flex-col gap-4">
<button class="w-full py-3 rounded-xl glass-button text-on-primary-container font-label-caps text-label-caps flex items-center justify-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[18px]">add</span>
                Add Transaction
            </button>
<ul class="flex flex-col gap-2">
<li>
<a class="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl font-label-caps text-label-caps hover:bg-glass-highlight hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">help</span>
                        Help
                    </a>
</li>
<li>
<a class="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl font-label-caps text-label-caps hover:bg-glass-highlight hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">logout</span>
                        Logout
                    </a>
</li>
</ul>
</div>
</nav>
<!-- Main Content Area -->
<main class="flex-1 ml-0 md:ml-64 p-gutter pb-32 md:pb-gutter flex flex-col gap-section-gap max-w-[1440px] mx-auto w-full">
<!-- TopAppBar (Mobile Only) -->
<header class="w-full sticky top-0 z-40 bg-glass-bg backdrop-blur-[5px] border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex justify-between items-center px-6 py-4 md:hidden -mx-gutter px-gutter w-[calc(100%+48px)]">
<div class="font-display-lg text-headline-md text-primary tracking-tight">Aura Finance</div>
<div class="flex items-center gap-4">
<button class="text-primary hover:bg-glass-highlight transition-colors p-2 rounded-full active:scale-95 duration-200">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="w-8 h-8 rounded-full overflow-hidden border border-glass-border">
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="A close-up portrait of a young professional wearing futuristic smart glasses, bathed in soft, cool blue lighting against a deep navy background. High-tech, minimal, clean aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1pyoPlOss8QAachZs9t5j94r5_v2J3yE-19OJH6tVARDzHfgxp92cNVsuno07o5QMWJa6cao4aDZWNsXAYxMEdAUaBLZHSYNFUFxO7te1tEkxyqwnk54z13aCKnXO_zv_axHYprvYGsoX7z5Tg4GvQUqvMPTB89zzLZn1iWSoHq6kam9Q5glXcD7F5azh0razMY65H2UPwT2icbfBpNcwgyk_Jb3CoM1efA4u8ZG9ZRnz8KSq1Iif"/>
</div>
</div>
</header>
<!-- Desktop Header Actions (Hidden on Mobile) -->
<div class="hidden md:flex justify-end items-center gap-4 w-full">
<button class="text-on-surface-variant hover:text-primary hover:bg-glass-highlight transition-colors p-2 rounded-full">
<span class="material-symbols-outlined">search</span>
</button>
<button class="text-on-surface-variant hover:text-primary hover:bg-glass-highlight transition-colors p-2 rounded-full">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="text-on-surface-variant hover:text-primary hover:bg-glass-highlight transition-colors p-2 rounded-full">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="w-10 h-10 rounded-full overflow-hidden border border-glass-border ml-2">
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="A high-end, atmospheric portrait of a business person in a dimly lit, futuristic glass office overlooking a neon city. The color palette focuses on deep navy and vibrant cyan accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAirG93_FBpOSFuQMzgLnIXwyrXo28W6Z_Pzfet9bihASab6fKg97SARoSBed4NhC6unj6pihgs5v9Lc7OiHaNMDBLnpnmLytijdpRiEijndyGhgRg2W-iqInIWEI8BF4in7wqITr7CQp7i9-L4pp2Q7BBEoXLk3NuZ6Q2WGLcw4ZuIUk8wxt8oDaIevsbXEfy-kGzmtBCjObP0dYvp4V8pgu3jIplxoTTvROxrKbmpLIsjUDgj7sfV"/>
</div>
</div>
<!-- Hero: Total Balance -->
<section class="glass-card rounded-xl p-card-padding relative overflow-hidden flex flex-col justify-center min-h-[200px]">
<div class="absolute inset-0 opacity-20 bg-gradient-to-br from-primary to-transparent z-0"></div>
<div class="relative z-10 flex flex-col gap-2">
<h2 class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Total Net Worth</h2>
<div class="font-display-lg text-display-lg text-primary tracking-tight">
                    $124,592.00
                </div>
<div class="flex items-center gap-2 mt-2">
<div class="flex items-center text-growth-cyan font-data-mono text-data-mono bg-growth-cyan/10 px-2 py-1 rounded-full border border-growth-cyan/20">
<span class="material-symbols-outlined text-[16px] mr-1">trending_up</span>
                        +2.4%
                    </div>
<span class="font-body-md text-body-md text-on-surface-variant">vs last month</span>
</div>
</div>
</section>
<!-- Bento Grid: Summaries & Budgets -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Monthly Summary Column -->
<div class="flex flex-col gap-6 col-span-1 md:col-span-1">
<!-- Income -->
<div class="glass-card rounded-xl p-card-padding flex flex-col gap-2">
<div class="flex justify-between items-start">
<h3 class="font-label-caps text-label-caps text-on-surface-variant">Monthly Income</h3>
<div class="w-8 h-8 rounded-full bg-growth-cyan/10 flex items-center justify-center text-growth-cyan">
<span class="material-symbols-outlined text-[18px]">arrow_downward</span>
</div>
</div>
<div class="font-headline-lg text-headline-lg text-on-surface mt-2">$8,450.00</div>
</div>
<!-- Expenses -->
<div class="glass-card rounded-xl p-card-padding flex flex-col gap-2">
<div class="flex justify-between items-start">
<h3 class="font-label-caps text-label-caps text-on-surface-variant">Monthly Expenses</h3>
<div class="w-8 h-8 rounded-full bg-expense-rose/10 flex items-center justify-center text-expense-rose">
<span class="material-symbols-outlined text-[18px]">arrow_upward</span>
</div>
</div>
<div class="font-headline-lg text-headline-lg text-on-surface mt-2">$4,120.50</div>
</div>
<!-- Net Change -->
<div class="glass-card rounded-xl p-card-padding flex flex-col gap-2 relative overflow-hidden">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
<div class="flex justify-between items-start relative z-10">
<h3 class="font-label-caps text-label-caps text-on-surface-variant">Net Savings</h3>
<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">account_balance</span>
</div>
</div>
<div class="font-headline-lg text-headline-lg text-primary mt-2 relative z-10">+$4,329.50</div>
</div>
</div>
<!-- Budgets Column -->
<div class="glass-card rounded-xl p-card-padding col-span-1 md:col-span-2 flex flex-col gap-6">
<div class="flex justify-between items-center">
<h3 class="font-headline-md text-headline-md text-on-surface">Budget Status</h3>
<button class="text-primary hover:text-primary-fixed transition-colors font-label-caps text-label-caps flex items-center gap-1">
                        View All <span class="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
<div class="flex flex-col gap-5 flex-grow justify-center">
<!-- Budget Item 1 -->
<div class="flex flex-col gap-2">
<div class="flex justify-between items-end">
<span class="font-body-md text-body-md text-on-surface">Groceries</span>
<span class="font-data-mono text-data-mono text-on-surface-variant">$450 / $600</span>
</div>
<div class="progress-bar-bg h-2 w-full">
<div class="progress-bar-fill w-[75%]"></div>
</div>
</div>
<!-- Budget Item 2 -->
<div class="flex flex-col gap-2">
<div class="flex justify-between items-end">
<span class="font-body-md text-body-md text-on-surface">Dining Out</span>
<span class="font-data-mono text-data-mono text-on-surface-variant">$280 / $300</span>
</div>
<div class="progress-bar-bg h-2 w-full">
<div class="progress-bar-fill warning w-[93%]"></div>
</div>
</div>
<!-- Budget Item 3 -->
<div class="flex flex-col gap-2">
<div class="flex justify-between items-end">
<span class="font-body-md text-body-md text-on-surface">Entertainment</span>
<span class="font-data-mono text-data-mono text-on-surface-variant">$150 / $100</span>
</div>
<div class="progress-bar-bg h-2 w-full">
<div class="progress-bar-fill danger w-full"></div>
</div>
</div>
<!-- Budget Item 4 -->
<div class="flex flex-col gap-2">
<div class="flex justify-between items-end">
<span class="font-body-md text-body-md text-on-surface">Transportation</span>
<span class="font-data-mono text-data-mono text-on-surface-variant">$120 / $200</span>
</div>
<div class="progress-bar-bg h-2 w-full">
<div class="progress-bar-fill w-[60%]"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Bottom Section: Transactions & Chart -->
<section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
<!-- Recent Transactions -->
<div class="glass-card rounded-xl p-card-padding flex flex-col gap-4">
<div class="flex justify-between items-center mb-2">
<h3 class="font-headline-md text-headline-md text-on-surface">Recent Transactions</h3>
<button class="text-primary hover:text-primary-fixed transition-colors font-label-caps text-label-caps">See All</button>
</div>
<div class="flex flex-col">
<!-- Tx 1 -->
<div class="flex items-center justify-between py-3 border-b border-glass-border/30 last:border-0">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-on-surface-variant">shopping_cart</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-medium text-on-surface">Whole Foods Market</span>
<span class="font-label-caps text-label-caps text-on-surface-variant lowercase capitalize">Groceries • Today</span>
</div>
</div>
<span class="font-data-mono text-data-mono text-on-surface">-$142.50</span>
</div>
<!-- Tx 2 -->
<div class="flex items-center justify-between py-3 border-b border-glass-border/30 last:border-0">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-on-surface-variant">flight</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-medium text-on-surface">Delta Airlines</span>
<span class="font-label-caps text-label-caps text-on-surface-variant lowercase capitalize">Travel • Yesterday</span>
</div>
</div>
<span class="font-data-mono text-data-mono text-on-surface">-$450.00</span>
</div>
<!-- Tx 3 -->
<div class="flex items-center justify-between py-3 border-b border-glass-border/30 last:border-0">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
<span class="material-symbols-outlined text-primary">work</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-medium text-on-surface">Tech Corp Inc.</span>
<span class="font-label-caps text-label-caps text-on-surface-variant lowercase capitalize">Salary • Oct 15</span>
</div>
</div>
<span class="font-data-mono text-data-mono text-growth-cyan">+$4,225.00</span>
</div>
<!-- Tx 4 -->
<div class="flex items-center justify-between py-3 border-b border-glass-border/30 last:border-0">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-on-surface-variant">restaurant</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-medium text-on-surface">Sushi Zen</span>
<span class="font-label-caps text-label-caps text-on-surface-variant lowercase capitalize">Dining • Oct 14</span>
</div>
</div>
<span class="font-data-mono text-data-mono text-on-surface">-$85.20</span>
</div>
</div>
</div>
<!-- Spending Breakdown (Simulated Chart) -->
<div class="glass-card rounded-xl p-card-padding flex flex-col gap-4">
<h3 class="font-headline-md text-headline-md text-on-surface">Spending Breakdown</h3>
<div class="flex-grow flex items-center justify-center relative min-h-[250px]">
<!-- Abstract representation of a donut chart using CSS -->
<div class="w-48 h-48 rounded-full border-[16px] border-surface-container-high relative flex items-center justify-center">
<!-- Chart segments simulated with conic-gradient on pseudo element for easier manipulation if needed, but simple CSS here -->
<div class="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-t-primary border-r-primary rotate-45"></div>
<div class="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-b-growth-cyan rotate-12"></div>
<div class="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-l-tertiary -rotate-12"></div>
<div class="text-center">
<span class="font-label-caps text-label-caps text-on-surface-variant block">Total</span>
<span class="font-headline-md text-headline-md text-on-surface">$4,120</span>
</div>
</div>
</div>
<div class="flex justify-center gap-4 flex-wrap mt-4">
<div class="flex items-center gap-2">
<div class="w-3 h-3 rounded-full bg-primary"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant">Housing</span>
</div>
<div class="flex items-center gap-2">
<div class="w-3 h-3 rounded-full bg-growth-cyan"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant">Food</span>
</div>
<div class="flex items-center gap-2">
<div class="w-3 h-3 rounded-full bg-tertiary"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant">Transport</span>
</div>
<div class="flex items-center gap-2">
<div class="w-3 h-3 rounded-full bg-surface-container-high border border-glass-border"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant">Other</span>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="fixed bottom-0 w-full z-50 md:hidden bg-glass-bg backdrop-blur-[10px] border-t border-glass-border shadow-[0_-4px_24px_rgba(0,0,0,0.15)] flex justify-around items-center px-4 pb-6 pt-2 w-full">
<a class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 min-w-[64px]" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-label-caps text-[10px] mt-1">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl min-w-[64px] transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">payments</span>
<span class="font-label-caps text-[10px] mt-1">Wallet</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl min-w-[64px] transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">history</span>
<span class="font-label-caps text-[10px] mt-1">History</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl min-w-[64px] transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">analytics</span>
<span class="font-label-caps text-[10px] mt-1">Budget</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl min-w-[64px] transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">menu</span>
<span class="font-label-caps text-[10px] mt-1">Menu</span>
</a>
</nav>
</body></html>

<!-- Financial Dashboard (Glass UI) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Transactions</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "glass-border": "rgba(255, 255, 255, 0.3)",
                        "on-tertiary-container": "#ffceb1",
                        "on-secondary": "#122f5f",
                        "primary-container": "#255cb1",
                        "on-surface": "#e2e2ea",
                        "tertiary-fixed-dim": "#ffb688",
                        "inverse-surface": "#e2e2ea",
                        "on-tertiary-fixed-variant": "#733500",
                        "deep-navy": "#001a41",
                        "outline": "#8d909d",
                        "on-secondary-fixed-variant": "#2c4677",
                        "expense-rose": "#ba1a1a",
                        "background": "#111319",
                        "on-tertiary-fixed": "#311300",
                        "secondary-fixed-dim": "#adc6ff",
                        "on-tertiary": "#512400",
                        "secondary": "#adc6ff",
                        "error-container": "#93000a",
                        "primary": "#adc6ff",
                        "on-primary": "#002e69",
                        "on-secondary-fixed": "#001a42",
                        "surface-bright": "#37393f",
                        "on-secondary-container": "#9cb5ed",
                        "inverse-primary": "#255cb1",
                        "surface-container-low": "#191b21",
                        "inverse-on-surface": "#2e3036",
                        "surface-container-highest": "#33353b",
                        "primary-fixed": "#d8e2ff",
                        "surface-container-lowest": "#0c0e13",
                        "surface-variant": "#33353b",
                        "surface-tint": "#adc6ff",
                        "surface-container-high": "#282a30",
                        "surface": "#111319",
                        "tertiary-fixed": "#ffdbc7",
                        "primary-fixed-dim": "#adc6ff",
                        "on-primary-fixed": "#001a41",
                        "tertiary-container": "#974800",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-error": "#690005",
                        "glass-bg": "rgba(255, 255, 255, 0.05)",
                        "on-background": "#e2e2ea",
                        "growth-cyan": "#49da9f",
                        "on-primary-fixed-variant": "#004493",
                        "on-primary-container": "#c8d8ff",
                        "secondary-container": "#2c4677",
                        "surface-dim": "#111319",
                        "on-surface-variant": "#c3c6d4",
                        "outline-variant": "#424752",
                        "secondary-fixed": "#d8e2ff",
                        "tertiary": "#ffb688",
                        "surface-container": "#1d2025",
                        "glass-highlight": "rgba(255, 255, 255, 0.15)"
                    },
                    borderRadius: {
                        DEFAULT: "0.25rem",
                        lg: "0.5rem",
                        xl: "0.75rem",
                        full: "9999px"
                    },
                    spacing: {
                        "section-gap": "40px",
                        unit: "4px",
                        "card-padding": "24px",
                        "margin-mobile": "20px",
                        gutter: "24px"
                    },
                    fontFamily: {
                        "headline-lg": ["Manrope"],
                        "display-lg": ["Manrope"],
                        "display-lg-mobile": ["Manrope"],
                        "label-caps": ["Manrope"],
                        "body-lg": ["Manrope"],
                        "headline-md": ["Manrope"],
                        "body-md": ["Manrope"],
                        "data-mono": ["Manrope"]
                    },
                    fontSize: {
                        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
                        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
                        "display-lg-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
                        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "700" }],
                        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                        "data-mono": ["14px", { lineHeight: "20px", fontWeight: "500" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: theme('colors.background');
            color: theme('colors.on-background');
            font-family: 'Manrope', sans-serif;
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(37, 92, 177, 0.15), transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(73, 218, 159, 0.1), transparent 25%);
            background-attachment: fixed;
        }

        /* Glass Utility Classes */
        .glass-panel {
            background-color: theme('colors.glass-bg');
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            box-shadow: 
                inset 1px 1px 0px 0px rgba(255, 255, 255, 0.15),
                0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .glass-panel-hover:hover {
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .glass-input {
            background-color: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: theme('colors.on-surface');
            transition: all 0.2s ease;
        }
        
        .glass-input:focus {
            border-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 10px rgba(173, 198, 255, 0.2);
            outline: none;
        }

        .glass-button {
            background-color: rgba(37, 92, 177, 0.5); /* Primary container with opacity */
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
        }
        
        .glass-button:hover {
            background-color: rgba(37, 92, 177, 0.7);
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.4);
        }
    </style>
</head>
<body class="flex flex-col min-h-screen">
<!-- TopAppBar -->
<header class="w-full sticky top-0 z-50 border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] bg-glass-bg backdrop-blur-[5px]">
<div class="flex justify-between items-center px-6 py-4 w-full">
<div class="flex items-center gap-4">
<span class="font-display-lg text-display-lg text-primary tracking-tight md:hidden">Aura Finance</span>
</div>
<div class="flex-1 flex justify-center hidden md:flex gap-8">
<nav class="flex space-x-8">
<!-- Nav items for top app bar (desktop fallback if side nav hidden, but instructions imply desktop side nav) -->
</nav>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full text-on-surface-variant hover:bg-glass-highlight transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="p-2 rounded-full text-on-surface-variant hover:bg-glass-highlight transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-glass-border">
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="A futuristic minimalist user avatar profile picture, glowing neon blue edges, dark background, highly detailed digital art style suitable for a high-end finance dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxqPDdI86lOWjCnWK88RIB8jBmmjVhVmhNF1NPloSNa5JvZVEUkaJBFnh0YS4UKCs1tumYIBo2B0_x26o22C77Rq5SWRm1z90YkHapLsKfUIg5Y-_QaB9VXi9RU6oawffHGN3MEnauLglgzYb7IyBWoG8DVilVKfrrjtZULgxkyMfm_cEdRUf3qKFQZDpc3vKIr8CThKz7LENb25_UvClnP80sQ_BkuHYe161k3WqTgIc1bTYG7PDS"/>
</div>
</div>
</div>
</header>
<div class="flex flex-1">
<!-- SideNavBar -->
<aside class="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col border-r border-glass-border shadow-2xl bg-glass-bg backdrop-blur-[5px] z-40">
<div class="p-6">
<div class="flex items-center gap-3 mb-2">
<div class="w-8 h-8 rounded bg-primary flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary font-bold">eco</span>
</div>
<span class="font-display-lg text-primary text-[24px] leading-tight font-bold tracking-tight">Aura Finance</span>
</div>
<span class="text-on-surface-variant font-label-caps text-label-caps block ml-11">Premium Tracking</span>
</div>
<nav class="flex flex-col h-full p-6 gap-section-gap pt-0 overflow-y-auto">
<ul class="space-y-2">
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">account_balance_wallet</span>
<span class="font-label-caps text-label-caps">Accounts</span>
</a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-primary bg-glass-highlight font-bold border-l-4 border-primary transition-all duration-300 ease-in-out group" href="#">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">receipt_long</span>
<span class="font-label-caps text-label-caps">Transactions</span>
</a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">category</span>
<span class="font-label-caps text-label-caps">Categories</span>
</a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">savings</span>
<span class="font-label-caps text-label-caps">Budgets</span>
</a>
</li>
</ul>
<div class="mt-auto">
<button class="w-full py-3 px-4 rounded-xl glass-button text-on-primary-container font-label-caps text-label-caps flex items-center justify-center gap-2 mb-6 shadow-lg shadow-primary-container/20 hover:shadow-primary-container/40">
<span class="material-symbols-outlined text-[18px]">add</span>
                        Add Transaction
                    </button>
<ul class="space-y-2 border-t border-glass-border pt-6">
<li>
<a class="flex items-center gap-3 px-4 py-2 rounded-xl text-on-surface-variant font-medium hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out group" href="#">
<span class="material-symbols-outlined text-[20px]">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-2 rounded-xl text-on-surface-variant font-medium hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out group" href="#">
<span class="material-symbols-outlined text-[20px]">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</li>
</ul>
</div>
</nav>
</aside>
<!-- Main Content Canvas -->
<main class="flex-1 md:ml-64 p-6 md:p-10 transition-all duration-300">
<div class="max-w-7xl mx-auto space-y-section-gap">
<!-- Header Section -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
<div>
<h1 class="font-headline-lg text-headline-lg text-on-surface">Transactions</h1>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage your financial activity.</p>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 rounded-lg glass-panel glass-panel-hover flex items-center gap-2 text-on-surface font-label-caps text-label-caps transition-all">
<span class="material-symbols-outlined text-[18px]">download</span>
                            Export
                        </button>
<button class="px-4 py-2 rounded-lg glass-button flex items-center gap-2 text-on-primary-container font-label-caps text-label-caps transition-all">
<span class="material-symbols-outlined text-[18px]">filter_list</span>
                            Filter
                        </button>
</div>
</div>
<!-- Transaction List Glass Container -->
<div class="glass-panel rounded-2xl overflow-hidden relative">
<!-- Subtle background gradient inside the glass -->
<div class="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent pointer-events-none"></div>
<div class="p-card-padding relative z-10">
<!-- Filters Bar -->
<div class="flex flex-wrap gap-4 mb-6 pb-6 border-b border-glass-border/50">
<div class="flex-1 min-w-[200px]">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full glass-input rounded-lg py-2 pl-10 pr-4 font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary/50" placeholder="Search transactions..." type="text"/>
</div>
</div>
<select class="glass-input rounded-lg py-2 px-4 font-body-md text-body-md appearance-none bg-glass-bg cursor-pointer pr-8 min-w-[120px]" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23c3c6d4%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 12px top 50%; background-size: 10px auto;">
<option class="bg-surface text-on-surface">All Dates</option>
<option class="bg-surface text-on-surface">This Month</option>
<option class="bg-surface text-on-surface">Last 30 Days</option>
</select>
<select class="glass-input rounded-lg py-2 px-4 font-body-md text-body-md appearance-none bg-glass-bg cursor-pointer pr-8 min-w-[140px]" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23c3c6d4%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 12px top 50%; background-size: 10px auto;">
<option class="bg-surface text-on-surface">All Accounts</option>
<option class="bg-surface text-on-surface">Main Checking</option>
<option class="bg-surface text-on-surface">Savings</option>
</select>
</div>
<!-- Table -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="border-b border-glass-border/30">
<th class="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">Date</th>
<th class="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">Description</th>
<th class="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold hidden md:table-cell">Category</th>
<th class="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold hidden lg:table-cell">Account</th>
<th class="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold text-right">Amount</th>
<th class="py-3 px-4 w-10"></th>
</tr>
</thead>
<tbody class="divide-y divide-glass-border/10">
<!-- Row 1: Income -->
<tr class="hover:bg-glass-highlight/50 transition-colors group cursor-pointer">
<td class="py-4 px-4 font-data-mono text-data-mono text-on-surface whitespace-nowrap">Oct 24, 2023</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-growth-cyan/10 flex items-center justify-center border border-growth-cyan/20">
<span class="material-symbols-outlined text-growth-cyan text-[16px]">arrow_downward</span>
</div>
<span class="font-body-md text-body-md text-on-surface font-medium">Acme Corp Payroll</span>
</div>
</td>
<td class="py-4 px-4 hidden md:table-cell">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-high text-on-surface-variant border border-glass-border/30">
                                                Income
                                            </span>
</td>
<td class="py-4 px-4 hidden lg:table-cell font-body-md text-body-md text-on-surface-variant">Main Checking</td>
<td class="py-4 px-4 font-data-mono text-data-mono text-growth-cyan text-right font-semibold">+$4,250.00</td>
<td class="py-4 px-4 text-right">
<button class="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 2: Expense -->
<tr class="hover:bg-glass-highlight/50 transition-colors group cursor-pointer">
<td class="py-4 px-4 font-data-mono text-data-mono text-on-surface whitespace-nowrap">Oct 23, 2023</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-glass-border/20">
<span class="material-symbols-outlined text-on-surface-variant text-[16px]">storefront</span>
</div>
<span class="font-body-md text-body-md text-on-surface font-medium">Whole Foods Market</span>
</div>
</td>
<td class="py-4 px-4 hidden md:table-cell">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-high text-on-surface-variant border border-glass-border/30">
                                                Groceries
                                            </span>
</td>
<td class="py-4 px-4 hidden lg:table-cell font-body-md text-body-md text-on-surface-variant">Main Checking</td>
<td class="py-4 px-4 font-data-mono text-data-mono text-on-surface text-right">-$142.80</td>
<td class="py-4 px-4 text-right">
<button class="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 3: Transfer -->
<tr class="hover:bg-glass-highlight/50 transition-colors group cursor-pointer">
<td class="py-4 px-4 font-data-mono text-data-mono text-on-surface whitespace-nowrap">Oct 21, 2023</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center border border-secondary/20">
<span class="material-symbols-outlined text-secondary text-[16px]">sync_alt</span>
</div>
<span class="font-body-md text-body-md text-on-surface font-medium">Transfer to Savings</span>
</div>
</td>
<td class="py-4 px-4 hidden md:table-cell">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-high text-on-surface-variant border border-glass-border/30">
                                                Transfer
                                            </span>
</td>
<td class="py-4 px-4 hidden lg:table-cell font-body-md text-body-md text-on-surface-variant">Main Checking -&gt; Savings</td>
<td class="py-4 px-4 font-data-mono text-data-mono text-on-surface-variant text-right italic">-$500.00</td>
<td class="py-4 px-4 text-right">
<button class="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
<!-- Row 4: Expense -->
<tr class="hover:bg-glass-highlight/50 transition-colors group cursor-pointer">
<td class="py-4 px-4 font-data-mono text-data-mono text-on-surface whitespace-nowrap">Oct 20, 2023</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-glass-border/20">
<span class="material-symbols-outlined text-on-surface-variant text-[16px]">local_gas_station</span>
</div>
<span class="font-body-md text-body-md text-on-surface font-medium">Shell Station</span>
</div>
</td>
<td class="py-4 px-4 hidden md:table-cell">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-high text-on-surface-variant border border-glass-border/30">
                                                Transport
                                            </span>
</td>
<td class="py-4 px-4 hidden lg:table-cell font-body-md text-body-md text-on-surface-variant">Rewards Card</td>
<td class="py-4 px-4 font-data-mono text-data-mono text-on-surface text-right">-$45.50</td>
<td class="py-4 px-4 text-right">
<button class="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span class="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="flex items-center justify-between mt-6 pt-4 border-t border-glass-border/20">
<span class="font-body-md text-body-md text-on-surface-variant">Showing 1-4 of 128</span>
<div class="flex gap-2">
<button class="p-2 rounded-lg glass-panel hover:bg-glass-highlight text-on-surface-variant disabled:opacity-50" disabled="">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="p-2 rounded-lg glass-panel hover:bg-glass-highlight text-on-surface-variant transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full z-50 md:hidden border-t border-glass-border shadow-[0_-4px_24px_rgba(0,0,0,0.15)] bg-glass-bg backdrop-blur-[10px]">
<div class="flex justify-around items-center px-4 pb-6 pt-2 w-full">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined mb-1">home</span>
<span class="font-label-caps text-label-caps">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined mb-1">payments</span>
<span class="font-label-caps text-label-caps">Wallet</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">history</span>
<span class="font-label-caps text-label-caps">History</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined mb-1">analytics</span>
<span class="font-label-caps text-label-caps">Budget</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined mb-1">menu</span>
<span class="font-label-caps text-label-caps">Menu</span>
</a>
</div>
</nav>
</body></html>

<!-- Transaction History (Glass UI) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Accounts</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "glass-border": "rgba(255, 255, 255, 0.3)",
                      "on-tertiary-container": "#ffceb1",
                      "on-secondary": "#122f5f",
                      "primary-container": "#255cb1",
                      "on-surface": "#e2e2ea",
                      "tertiary-fixed-dim": "#ffb688",
                      "inverse-surface": "#e2e2ea",
                      "on-tertiary-fixed-variant": "#733500",
                      "deep-navy": "#001a41",
                      "outline": "#8d909d",
                      "on-secondary-fixed-variant": "#2c4677",
                      "expense-rose": "#ba1a1a",
                      "background": "#111319",
                      "on-tertiary-fixed": "#311300",
                      "secondary-fixed-dim": "#adc6ff",
                      "on-tertiary": "#512400",
                      "secondary": "#adc6ff",
                      "error-container": "#93000a",
                      "primary": "#adc6ff",
                      "on-primary": "#002e69",
                      "on-secondary-fixed": "#001a42",
                      "surface-bright": "#37393f",
                      "on-secondary-container": "#9cb5ed",
                      "inverse-primary": "#255cb1",
                      "surface-container-low": "#191b21",
                      "inverse-on-surface": "#2e3036",
                      "surface-container-highest": "#33353b",
                      "primary-fixed": "#d8e2ff",
                      "surface-container-lowest": "#0c0e13",
                      "surface-variant": "#33353b",
                      "surface-tint": "#adc6ff",
                      "surface-container-high": "#282a30",
                      "surface": "#111319",
                      "tertiary-fixed": "#ffdbc7",
                      "primary-fixed-dim": "#adc6ff",
                      "on-primary-fixed": "#001a41",
                      "tertiary-container": "#974800",
                      "error": "#ffb4ab",
                      "on-error-container": "#ffdad6",
                      "on-error": "#690005",
                      "glass-bg": "rgba(255, 255, 255, 0.05)",
                      "on-background": "#e2e2ea",
                      "growth-cyan": "#49da9f",
                      "on-primary-fixed-variant": "#004493",
                      "on-primary-container": "#c8d8ff",
                      "secondary-container": "#2c4677",
                      "surface-dim": "#111319",
                      "on-surface-variant": "#c3c6d4",
                      "outline-variant": "#424752",
                      "secondary-fixed": "#d8e2ff",
                      "tertiary": "#ffb688",
                      "surface-container": "#1d2025",
                      "glass-highlight": "rgba(255, 255, 255, 0.15)"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "section-gap": "40px",
                      "unit": "4px",
                      "card-padding": "24px",
                      "margin-mobile": "20px",
                      "gutter": "24px"
              },
              "fontFamily": {
                      "headline-lg": ["manrope"],
                      "display-lg": ["manrope"],
                      "display-lg-mobile": ["manrope"],
                      "label-caps": ["manrope"],
                      "body-lg": ["manrope"],
                      "headline-md": ["manrope"],
                      "body-md": ["manrope"],
                      "data-mono": ["manrope"]
              },
              "fontSize": {
                      "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "500"}]
              }
            }
          }
        }
    </script>
<style>
        body {
            background-color: theme('colors.background');
            color: theme('colors.on-surface');
            background-image: radial-gradient(circle at top right, rgba(37, 92, 177, 0.15) 0%, transparent 40%),
                              radial-gradient(circle at bottom left, rgba(73, 218, 159, 0.1) 0%, transparent 50%);
            background-attachment: fixed;
        }
        
        .glass-panel {
            background-color: theme('colors.glass-bg');
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .glass-panel:hover {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        .glass-button {
            background-color: rgba(37, 92, 177, 0.5); /* primary-container approx */
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.1);
            transition: all 0.2s ease;
        }
        
        .glass-button:hover {
            background-color: rgba(37, 92, 177, 0.7);
            transform: translateY(-1px);
        }
        
        .glass-button:active {
            transform: scale(0.98);
        }

        .glass-button-secondary {
            background-color: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            transition: all 0.2s ease;
        }

        .glass-button-secondary:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body class="min-h-screen flex antialiased">
<!-- SideNavBar (Desktop Only) -->
<nav class="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-glass-bg backdrop-blur-[5px] border-r border-glass-border shadow-2xl z-40">
<div class="flex flex-col h-full p-6 gap-section-gap">
<!-- Brand -->
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary font-bold">flare</span>
</div>
<div>
<h1 class="font-display-lg text-headline-md text-primary tracking-tight">Aura Finance</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant">Premium Tracking</p>
</div>
</div>
<!-- Navigation Links -->
<div class="flex-1 flex flex-col gap-2 mt-8">
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-primary bg-glass-highlight transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">account_balance_wallet</span>
<span class="font-label-caps text-label-caps">Accounts</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">receipt_long</span>
<span class="font-label-caps text-label-caps">Transactions</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">category</span>
<span class="font-label-caps text-label-caps">Categories</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">savings</span>
<span class="font-label-caps text-label-caps">Budgets</span>
</a>
</div>
<!-- CTA -->
<button class="glass-button w-full py-3 rounded-xl flex items-center justify-center gap-2 text-on-primary-container font-label-caps text-label-caps mt-auto mb-4">
<span class="material-symbols-outlined">add</span>
                Add Transaction
            </button>
<!-- Footer Links -->
<div class="flex flex-col gap-2 pt-4 border-t border-glass-border">
<a class="flex items-center gap-4 p-2 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
<a class="flex items-center gap-4 p-2 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</div>
</div>
</nav>
<!-- Main Content Area -->
<main class="flex-1 md:ml-64 relative min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="w-full sticky top-0 z-30 bg-glass-bg backdrop-blur-[5px] border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex justify-between items-center px-6 py-4">
<div class="flex items-center gap-4">
<h2 class="font-headline-lg text-headline-lg text-on-surface tracking-tight hidden md:block">Accounts</h2>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden md:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="bg-glass-bg border border-glass-border rounded-full py-2 pl-10 pr-4 text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:bg-glass-highlight transition-all w-64 placeholder-on-surface-variant" placeholder="Search accounts..." type="text"/>
</div>
<button class="p-2 rounded-full text-on-surface-variant hover:bg-glass-highlight transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="p-2 rounded-full text-on-surface-variant hover:bg-glass-highlight transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-glass-border ml-2">
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="A highly detailed close-up portrait of a professional individual with modern, ethereal lighting, casting soft blue and cyan reflections, matching the premium atmospheric glassmorphism aesthetic of a dark-mode high-end financial application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbs62wW_9jj9AHErneUX3HMmBvJ2snFlaEIvgE0-KgTyOrhx7ypx4zqpmt9oa8eghU52VzO6EmUL19OY5iUoECVV-s7Cb5C1qBkgalKGZyOg7cwqBGls0k_Cm3gOujQl3wki4-KY3OjNtw-egEZD5jRhnVZPlKM7CN_4aQJaLzQ38szcOeFUQfATwCqmRJM3E3h773P0wn4vlxOgpEGdS9QhHhSq3_EOnrjMMbfIfocfcE_m0NiAcX"/>
</div>
</div>
</header>
<!-- Canvas -->
<div class="p-gutter pb-32 md:pb-gutter flex-1 flex flex-col gap-section-gap max-w-7xl mx-auto w-full">
<!-- Page Header Actions -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4">
<div>
<h2 class="font-display-lg text-display-lg text-on-surface">Total Balance</h2>
<div class="flex items-end gap-3 mt-2">
<span class="font-data-mono text-headline-lg text-primary">$124,592.00</span>
<span class="font-body-md text-body-md text-growth-cyan flex items-center mb-1">
<span class="material-symbols-outlined text-[18px]">trending_up</span>
                            +2.4%
                        </span>
</div>
</div>
<div class="flex gap-3 w-full sm:w-auto">
<button class="glass-button-secondary flex-1 sm:flex-none px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-on-surface font-label-caps text-label-caps">
<span class="material-symbols-outlined">sync_alt</span>
                        Balance Adjustment
                    </button>
<button class="glass-button flex-1 sm:flex-none px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-on-primary-container font-label-caps text-label-caps">
<span class="material-symbols-outlined">add</span>
                        Add Account
                    </button>
</div>
</div>
<!-- Accounts Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
<!-- Account Card: Bank (MYR) -->
<div class="glass-panel rounded-xl p-card-padding flex flex-col gap-4 relative overflow-hidden group">
<div class="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
<div class="flex justify-between items-start z-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-secondary">account_balance</span>
</div>
<div>
<h3 class="font-headline-md text-body-lg text-on-surface">Maybank</h3>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">Bank Account</p>
</div>
</div>
<span class="px-2 py-1 rounded-full bg-white/10 text-on-surface font-label-caps text-[10px]">MYR</span>
</div>
<div class="mt-4 z-10">
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">Available Balance</p>
<p class="font-data-mono text-headline-md text-on-surface">RM 45,230.50</p>
</div>
<div class="mt-auto pt-4 border-t border-white/10 flex justify-between items-center z-10">
<span class="font-data-mono text-body-md text-on-surface-variant">**** 8923</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>
<!-- Account Card: Bank (USD) -->
<div class="glass-panel rounded-xl p-card-padding flex flex-col gap-4 relative overflow-hidden group">
<div class="absolute -right-10 -top-10 w-32 h-32 bg-growth-cyan/10 rounded-full blur-2xl group-hover:bg-growth-cyan/20 transition-all duration-500"></div>
<div class="flex justify-between items-start z-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-growth-cyan">public</span>
</div>
<div>
<h3 class="font-headline-md text-body-lg text-on-surface">Chase Global</h3>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">Bank Account</p>
</div>
</div>
<span class="px-2 py-1 rounded-full bg-white/10 text-on-surface font-label-caps text-[10px]">USD</span>
</div>
<div class="mt-4 z-10">
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">Available Balance</p>
<p class="font-data-mono text-headline-md text-on-surface">$ 12,450.00</p>
</div>
<div class="mt-auto pt-4 border-t border-white/10 flex justify-between items-center z-10">
<span class="font-data-mono text-body-md text-on-surface-variant">**** 4412</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>
<!-- Account Card: E-Wallet (SGD) -->
<div class="glass-panel rounded-xl p-card-padding flex flex-col gap-4 relative overflow-hidden group">
<div class="absolute -right-10 -top-10 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl group-hover:bg-tertiary/20 transition-all duration-500"></div>
<div class="flex justify-between items-start z-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-tertiary">phone_iphone</span>
</div>
<div>
<h3 class="font-headline-md text-body-lg text-on-surface">GrabPay</h3>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">E-Wallet</p>
</div>
</div>
<span class="px-2 py-1 rounded-full bg-white/10 text-on-surface font-label-caps text-[10px]">SGD</span>
</div>
<div class="mt-4 z-10">
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">Available Balance</p>
<p class="font-data-mono text-headline-md text-on-surface">S$ 845.20</p>
</div>
<div class="mt-auto pt-4 border-t border-white/10 flex justify-between items-center z-10">
<span class="font-data-mono text-body-md text-on-surface-variant">+65 9*** **82</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>
<!-- Account Card: Credit Card (MYR) -->
<div class="glass-panel rounded-xl p-card-padding flex flex-col gap-4 relative overflow-hidden group">
<div class="absolute -right-10 -top-10 w-32 h-32 bg-expense-rose/10 rounded-full blur-2xl group-hover:bg-expense-rose/20 transition-all duration-500"></div>
<div class="flex justify-between items-start z-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-expense-rose">credit_card</span>
</div>
<div>
<h3 class="font-headline-md text-body-lg text-on-surface">CIMB Visa</h3>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">Credit Card</p>
</div>
</div>
<span class="px-2 py-1 rounded-full bg-white/10 text-on-surface font-label-caps text-[10px]">MYR</span>
</div>
<div class="mt-4 z-10">
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">Current Balance</p>
<p class="font-data-mono text-headline-md text-expense-rose">-RM 3,250.00</p>
<div class="w-full bg-surface-container h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-expense-rose h-full rounded-full" style="width: 35%"></div>
</div>
<p class="font-data-mono text-[10px] text-on-surface-variant mt-1 text-right">Limit: RM 10,000</p>
</div>
<div class="mt-auto pt-4 border-t border-white/10 flex justify-between items-center z-10">
<span class="font-data-mono text-body-md text-on-surface-variant">**** 1129</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>
<!-- Account Card: Cash -->
<div class="glass-panel rounded-xl p-card-padding flex flex-col gap-4 relative overflow-hidden group border-dashed">
<div class="flex justify-between items-start z-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-on-surface">payments</span>
</div>
<div>
<h3 class="font-headline-md text-body-lg text-on-surface">Physical Cash</h3>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">Cash</p>
</div>
</div>
<span class="px-2 py-1 rounded-full bg-white/10 text-on-surface font-label-caps text-[10px]">MYR</span>
</div>
<div class="mt-4 z-10">
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">Available Balance</p>
<p class="font-data-mono text-headline-md text-on-surface">RM 450.00</p>
</div>
<div class="mt-auto pt-4 border-t border-white/10 flex justify-between items-center z-10">
<span class="font-data-mono text-body-md text-on-surface-variant">Wallet</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
</div>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="fixed bottom-0 w-full z-50 md:hidden bg-glass-bg backdrop-blur-[10px] border-t border-glass-border shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
<div class="flex justify-around items-center px-4 pb-6 pt-2 w-full">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-label-caps text-[10px] mt-1">Home</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
<span class="font-label-caps text-[10px] mt-1">Accounts</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined">history</span>
<span class="font-label-caps text-[10px] mt-1">History</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-caps text-[10px] mt-1">Budget</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined">menu</span>
<span class="font-label-caps text-[10px] mt-1">Menu</span>
</a>
</div>
</nav>
</body></html>

<!-- My Accounts (Glass UI) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Categories</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "glass-border": "rgba(255, 255, 255, 0.3)",
                        "on-tertiary-container": "#ffceb1",
                        "on-secondary": "#122f5f",
                        "primary-container": "#255cb1",
                        "on-surface": "#e2e2ea",
                        "tertiary-fixed-dim": "#ffb688",
                        "inverse-surface": "#e2e2ea",
                        "on-tertiary-fixed-variant": "#733500",
                        "deep-navy": "#001a41",
                        "outline": "#8d909d",
                        "on-secondary-fixed-variant": "#2c4677",
                        "expense-rose": "#ba1a1a",
                        "background": "#111319",
                        "on-tertiary-fixed": "#311300",
                        "secondary-fixed-dim": "#adc6ff",
                        "on-tertiary": "#512400",
                        "secondary": "#adc6ff",
                        "error-container": "#93000a",
                        "primary": "#adc6ff",
                        "on-primary": "#002e69",
                        "on-secondary-fixed": "#001a42",
                        "surface-bright": "#37393f",
                        "on-secondary-container": "#9cb5ed",
                        "inverse-primary": "#255cb1",
                        "surface-container-low": "#191b21",
                        "inverse-on-surface": "#2e3036",
                        "surface-container-highest": "#33353b",
                        "primary-fixed": "#d8e2ff",
                        "surface-container-lowest": "#0c0e13",
                        "surface-variant": "#33353b",
                        "surface-tint": "#adc6ff",
                        "surface-container-high": "#282a30",
                        "surface": "#111319",
                        "tertiary-fixed": "#ffdbc7",
                        "primary-fixed-dim": "#adc6ff",
                        "on-primary-fixed": "#001a41",
                        "tertiary-container": "#974800",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-error": "#690005",
                        "glass-bg": "rgba(255, 255, 255, 0.05)",
                        "on-background": "#e2e2ea",
                        "growth-cyan": "#49da9f",
                        "on-primary-fixed-variant": "#004493",
                        "on-primary-container": "#c8d8ff",
                        "secondary-container": "#2c4677",
                        "surface-dim": "#111319",
                        "on-surface-variant": "#c3c6d4",
                        "outline-variant": "#424752",
                        "secondary-fixed": "#d8e2ff",
                        "tertiary": "#ffb688",
                        "surface-container": "#1d2025",
                        "glass-highlight": "rgba(255, 255, 255, 0.15)"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "section-gap": "40px",
                        "unit": "4px",
                        "card-padding": "24px",
                        "margin-mobile": "20px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Manrope"],
                        "display-lg": ["Manrope"],
                        "display-lg-mobile": ["Manrope"],
                        "label-caps": ["Manrope"],
                        "body-lg": ["Manrope"],
                        "headline-md": ["Manrope"],
                        "body-md": ["Manrope"],
                        "data-mono": ["Manrope"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "data-mono": ["14px", { "lineHeight": "20px", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: theme('colors.background');
            color: theme('colors.on-background');
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(37, 92, 177, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(73, 218, 159, 0.05) 0%, transparent 50%);
            background-attachment: fixed;
        }
        
        .glass-panel {
            background-color: theme('colors.glass-bg');
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            box-shadow: inset 1px 1px 0px 0px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.1);
        }

        .glass-panel:hover {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Thin scrollbar for Webkit */
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.2);
        }
    </style>
</head>
<body class="flex min-h-screen">
<!-- SideNavBar (Desktop Only) -->
<nav class="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-glass-bg backdrop-blur-[5px] border-r border-glass-border shadow-2xl p-6 gap-section-gap z-40">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-3xl" style="font-variation-settings: 'FILL' 1;">bubble_chart</span>
<div>
<h1 class="font-display-lg text-display-lg-mobile text-primary tracking-tight" style="font-size: 24px; line-height: 28px;">Aura Finance</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant">Premium Tracking</p>
</div>
</div>
<button class="w-full py-3 px-4 rounded-lg bg-primary/40 hover:bg-primary/60 border border-glass-border shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.2)] backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group">
<span class="material-symbols-outlined text-on-primary-container group-hover:scale-110 transition-transform">add</span>
<span class="font-label-caps text-label-caps text-on-primary-container">Add Transaction</span>
</button>
<div class="flex-1 flex flex-col gap-2">
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">account_balance_wallet</span>
<span class="font-label-caps text-label-caps">Accounts</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">receipt_long</span>
<span class="font-label-caps text-label-caps">Transactions</span>
</a>
<!-- Active Tab -->
<a class="flex items-center gap-4 p-3 rounded-xl text-primary bg-glass-highlight transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">category</span>
<span class="font-label-caps text-label-caps">Categories</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">savings</span>
<span class="font-label-caps text-label-caps">Budgets</span>
</a>
</div>
<div class="flex flex-col gap-2 mt-auto pt-4 border-t border-glass-border">
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</div>
</nav>
<!-- Main Content Area -->
<main class="flex-1 ml-0 md:ml-64 w-full flex flex-col min-h-screen">
<!-- TopAppBar (Web) -->
<header class="w-full sticky top-0 z-50 bg-glass-bg backdrop-blur-[5px] border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] hidden md:flex justify-between items-center px-6 py-4">
<div class="font-headline-md text-headline-md text-on-surface font-bold tracking-tight flex items-center gap-2">
<span>Categories</span>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden lg:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="bg-glass-bg border border-glass-border rounded-full py-2 pl-10 pr-4 text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary/80 focus:bg-glass-highlight transition-all w-64 placeholder:text-on-surface-variant" placeholder="Search categories..." type="text"/>
</div>
<button class="p-2 rounded-full text-on-surface-variant hover:bg-glass-highlight hover:text-primary transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="p-2 rounded-full text-on-surface-variant hover:bg-glass-highlight hover:text-primary transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="w-10 h-10 rounded-full bg-surface-variant border border-glass-border overflow-hidden ml-2">
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="A futuristic, ethereal portrait of a user in a clean, minimalist setting, lit by soft cyan and deep blue atmospheric lighting. Subtle holographic UI elements float in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc3ytOuNBjHs70qIQ7NXKN_AktqmjoBMV77w-M4sDnQIakO03muGBGs9RBmrxobUOAnBqgalBZqZwDKEz2ebrc-Yehwy2Z0A_6eW6LqLK_yNLL6mgsktX8enRwPpGbvaG7UUq0PnT0o0XJe42dNJ0DgPVpKN85Eygkt-xJoeuxxbgGvG2hGHYLanI7DWYEoJKJYXPUgYwXwcCAjFaX4mu_n_baTl_aqe9oydNq-ix-uMisVnUe1-tY"/>
</div>
</div>
</header>
<!-- Canvas -->
<div class="p-4 md:p-gutter flex-1">
<!-- Header Actions -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-section-gap gap-4">
<div>
<h2 class="font-headline-lg text-headline-lg text-on-surface">Manage Classifications</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Organize your transaction flow to maintain clear financial visibility.</p>
</div>
<button class="py-2 px-6 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary font-label-caps text-label-caps flex items-center gap-2 backdrop-blur-sm transition-all duration-300">
<span class="material-symbols-outlined text-sm">add_circle</span>
                    Create Custom
                </button>
</div>
<!-- Bento Grid / Columns Layout -->
<div class="grid grid-cols-1 xl:grid-cols-2 gap-gutter">
<!-- Income Categories Column -->
<section class="flex flex-col gap-4">
<div class="flex items-center gap-2 mb-2 px-2">
<span class="material-symbols-outlined text-growth-cyan">arrow_circle_up</span>
<h3 class="font-headline-md text-headline-md text-growth-cyan tracking-wide">Inflow Streams</h3>
</div>
<!-- Glass Card - Income -->
<div class="glass-panel rounded-xl p-card-padding transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
<!-- Subtle Income Gradient Background -->
<div class="absolute inset-0 bg-gradient-to-br from-growth-cyan/5 to-transparent opacity-50 z-0"></div>
<div class="flex items-center gap-4 z-10">
<div class="w-12 h-12 rounded-full bg-growth-cyan/10 border border-growth-cyan/30 flex items-center justify-center">
<span class="material-symbols-outlined text-growth-cyan">work</span>
</div>
<div>
<h4 class="font-body-lg text-body-lg text-on-surface font-semibold">Primary Salary</h4>
<p class="font-data-mono text-data-mono text-on-surface-variant">4 Active Rules</p>
</div>
</div>
<div class="flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-full hover:bg-glass-highlight text-on-surface-variant hover:text-primary transition-colors" title="Edit">
<span class="material-symbols-outlined text-sm">edit</span>
</button>
<button class="p-2 rounded-full hover:bg-error/20 text-on-surface-variant hover:text-error transition-colors" title="Deactivate">
<span class="material-symbols-outlined text-sm">visibility_off</span>
</button>
</div>
</div>
<!-- Glass Card - Income 2 -->
<div class="glass-panel rounded-xl p-card-padding transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-growth-cyan/5 to-transparent opacity-50 z-0"></div>
<div class="flex items-center gap-4 z-10">
<div class="w-12 h-12 rounded-full bg-growth-cyan/10 border border-growth-cyan/30 flex items-center justify-center">
<span class="material-symbols-outlined text-growth-cyan">trending_up</span>
</div>
<div>
<h4 class="font-body-lg text-body-lg text-on-surface font-semibold">Investments &amp; Dividends</h4>
<p class="font-data-mono text-data-mono text-on-surface-variant">2 Active Rules</p>
</div>
</div>
<div class="flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-full hover:bg-glass-highlight text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">edit</span>
</button>
<button class="p-2 rounded-full hover:bg-error/20 text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-sm">visibility_off</span>
</button>
</div>
</div>
<!-- Glass Card - Income 3 (Deactivated) -->
<div class="glass-panel rounded-xl p-card-padding transition-all duration-300 flex items-center justify-between group relative overflow-hidden opacity-60">
<div class="flex items-center gap-4 z-10">
<div class="w-12 h-12 rounded-full bg-surface-variant/50 border border-glass-border flex items-center justify-center">
<span class="material-symbols-outlined text-outline">sell</span>
</div>
<div>
<h4 class="font-body-lg text-body-lg text-outline font-semibold line-through">Asset Sales</h4>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded-full bg-surface-container text-[10px] font-label-caps text-outline-variant tracking-wider">Inactive</span>
</div>
</div>
</div>
<div class="flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-full hover:bg-growth-cyan/20 text-outline hover:text-growth-cyan transition-colors" title="Reactivate">
<span class="material-symbols-outlined text-sm">visibility</span>
</button>
</div>
</div>
</section>
<!-- Expense Categories Column -->
<section class="flex flex-col gap-4">
<div class="flex items-center gap-2 mb-2 px-2">
<span class="material-symbols-outlined text-tertiary">arrow_circle_down</span>
<h3 class="font-headline-md text-headline-md text-tertiary tracking-wide">Outflow Channels</h3>
</div>
<!-- Glass Card - Expense -->
<div class="glass-panel rounded-xl p-card-padding transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
<!-- Subtle Expense Gradient Background -->
<div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-50 z-0"></div>
<div class="flex items-center gap-4 z-10">
<div class="w-12 h-12 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary">home</span>
</div>
<div>
<h4 class="font-body-lg text-body-lg text-on-surface font-semibold">Housing &amp; Utilities</h4>
<p class="font-data-mono text-data-mono text-on-surface-variant">12 Active Rules</p>
</div>
</div>
<div class="flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-full hover:bg-glass-highlight text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">edit</span>
</button>
<button class="p-2 rounded-full hover:bg-error/20 text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-sm">visibility_off</span>
</button>
</div>
</div>
<!-- Glass Card - Expense 2 -->
<div class="glass-panel rounded-xl p-card-padding transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-50 z-0"></div>
<div class="flex items-center gap-4 z-10">
<div class="w-12 h-12 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary">restaurant</span>
</div>
<div>
<h4 class="font-body-lg text-body-lg text-on-surface font-semibold">Dining &amp; Leisure</h4>
<p class="font-data-mono text-data-mono text-on-surface-variant">8 Active Rules</p>
</div>
</div>
<div class="flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-full hover:bg-glass-highlight text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">edit</span>
</button>
<button class="p-2 rounded-full hover:bg-error/20 text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-sm">visibility_off</span>
</button>
</div>
</div>
<!-- Glass Card - Expense 3 -->
<div class="glass-panel rounded-xl p-card-padding transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-50 z-0"></div>
<div class="flex items-center gap-4 z-10">
<div class="w-12 h-12 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary">directions_car</span>
</div>
<div>
<h4 class="font-body-lg text-body-lg text-on-surface font-semibold">Transportation</h4>
<p class="font-data-mono text-data-mono text-on-surface-variant">3 Active Rules</p>
</div>
</div>
<div class="flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-full hover:bg-glass-highlight text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">edit</span>
</button>
<button class="p-2 rounded-full hover:bg-error/20 text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-sm">visibility_off</span>
</button>
</div>
</div>
</section>
</div>
</div>
</main>
</body></html>

<!-- Manage Categories (Glass UI) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Budgets</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "glass-border": "rgba(255, 255, 255, 0.3)",
                        "on-tertiary-container": "#ffceb1",
                        "on-secondary": "#122f5f",
                        "primary-container": "#255cb1",
                        "on-surface": "#e2e2ea",
                        "tertiary-fixed-dim": "#ffb688",
                        "inverse-surface": "#e2e2ea",
                        "on-tertiary-fixed-variant": "#733500",
                        "deep-navy": "#001a41",
                        "outline": "#8d909d",
                        "on-secondary-fixed-variant": "#2c4677",
                        "expense-rose": "#ba1a1a",
                        "background": "#111319",
                        "on-tertiary-fixed": "#311300",
                        "secondary-fixed-dim": "#adc6ff",
                        "on-tertiary": "#512400",
                        "secondary": "#adc6ff",
                        "error-container": "#93000a",
                        "primary": "#adc6ff",
                        "on-primary": "#002e69",
                        "on-secondary-fixed": "#001a42",
                        "surface-bright": "#37393f",
                        "on-secondary-container": "#9cb5ed",
                        "inverse-primary": "#255cb1",
                        "surface-container-low": "#191b21",
                        "inverse-on-surface": "#2e3036",
                        "surface-container-highest": "#33353b",
                        "primary-fixed": "#d8e2ff",
                        "surface-container-lowest": "#0c0e13",
                        "surface-variant": "#33353b",
                        "surface-tint": "#adc6ff",
                        "surface-container-high": "#282a30",
                        "surface": "#111319",
                        "tertiary-fixed": "#ffdbc7",
                        "primary-fixed-dim": "#adc6ff",
                        "on-primary-fixed": "#001a41",
                        "tertiary-container": "#974800",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-error": "#690005",
                        "glass-bg": "rgba(255, 255, 255, 0.05)",
                        "on-background": "#e2e2ea",
                        "growth-cyan": "#49da9f",
                        "on-primary-fixed-variant": "#004493",
                        "on-primary-container": "#c8d8ff",
                        "secondary-container": "#2c4677",
                        "surface-dim": "#111319",
                        "on-surface-variant": "#c3c6d4",
                        "outline-variant": "#424752",
                        "secondary-fixed": "#d8e2ff",
                        "tertiary": "#ffb688",
                        "surface-container": "#1d2025",
                        "glass-highlight": "rgba(255, 255, 255, 0.15)"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "section-gap": "40px",
                        "unit": "4px",
                        "card-padding": "24px",
                        "margin-mobile": "20px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Manrope"],
                        "display-lg": ["Manrope"],
                        "display-lg-mobile": ["Manrope"],
                        "label-caps": ["Manrope"],
                        "body-lg": ["Manrope"],
                        "headline-md": ["Manrope"],
                        "body-md": ["Manrope"],
                        "data-mono": ["Manrope"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "data-mono": ["14px", { "lineHeight": "20px", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: #111319; /* background */
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(37, 92, 177, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(73, 218, 159, 0.1) 0%, transparent 50%);
            background-attachment: fixed;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.05); /* glass-bg */
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3); /* glass-border */
            box-shadow: inset 1px 1px 0px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.1);
            border-radius: 1rem; /* xl */
        }
        
        .glass-card:hover {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.10);
            transition: all 0.3s ease;
        }
        
        .glass-card-over-budget {
             background: rgba(255, 180, 171, 0.05); /* error mixed with glass */
             border-color: rgba(255, 180, 171, 0.3);
             box-shadow: inset 1px 1px 0px rgba(255,180,171,0.15), 0 8px 32px rgba(105,0,5,0.2);
        }
        
        .glass-button {
            background: rgba(37, 92, 177, 0.5); /* primary-container approx */
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: inset 1px 1px 0px rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.1);
        }
        
        .glass-button:hover {
            background: rgba(37, 92, 177, 0.7);
        }

        .progress-bar-bg {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 9999px;
            overflow: hidden;
        }
        
        .progress-bar-fill {
            background: linear-gradient(90deg, #255cb1, #adc6ff); /* inverse-primary to primary */
            border-radius: 9999px;
        }
        
        .progress-bar-fill-over {
            background: linear-gradient(90deg, #ba1a1a, #ffb4ab); /* expense-rose to error */
        }
    </style>
</head>
<body class="text-on-surface font-body-md antialiased min-h-screen flex">
<!-- SideNavBar (Desktop Only) -->
<nav class="bg-glass-bg backdrop-blur-[5px] h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col border-r border-glass-border shadow-2xl p-6 gap-section-gap z-40 text-on-surface-variant font-label-caps text-label-caps transition-all duration-300 ease-in-out">
<div class="flex flex-col gap-2">
<div class="flex items-center gap-3 mb-4">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">account_balance</span>
</div>
<div>
<h1 class="font-display-lg text-[24px] leading-tight text-primary tracking-tight">Aura Finance</h1>
<p class="text-on-surface-variant text-[10px] uppercase tracking-wider">Premium Tracking</p>
</div>
</div>
</div>
<div class="flex flex-col gap-2 flex-grow">
<!-- Dashboard -->
<a class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-glass-highlight hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span>Dashboard</span>
</a>
<!-- Accounts -->
<a class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-glass-highlight hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">account_balance_wallet</span>
<span>Accounts</span>
</a>
<!-- Transactions -->
<a class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-glass-highlight hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">receipt_long</span>
<span>Transactions</span>
</a>
<!-- Categories -->
<a class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-glass-highlight hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">category</span>
<span>Categories</span>
</a>
<!-- Budgets (Active) -->
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-primary bg-glass-highlight hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">savings</span>
<span>Budgets</span>
</a>
</div>
<div class="mt-auto flex flex-col gap-2">
<button class="glass-button text-on-surface w-full py-3 rounded-xl flex items-center justify-center gap-2 mb-4 transition-transform active:scale-95 duration-200">
<span class="material-symbols-outlined">add</span>
<span>Add Transaction</span>
</button>
<a class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-glass-highlight hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">help</span>
<span>Help</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-glass-highlight hover:text-on-surface transition-all text-error" href="#">
<span class="material-symbols-outlined">logout</span>
<span>Logout</span>
</a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 md:ml-64 min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="bg-glass-bg backdrop-blur-[5px] w-full sticky top-0 z-50 border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex justify-between items-center px-6 py-4 w-full">
<div class="md:hidden">
<h1 class="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Aura Finance</h1>
</div>
<div class="hidden md:block">
<!-- Empty spacer for desktop alignment -->
</div>
<div class="flex items-center gap-6">
<!-- Search Bar -->
<div class="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-glass-border focus-within:border-primary focus-within:bg-surface-container transition-all">
<span class="material-symbols-outlined text-on-surface-variant mr-2">search</span>
<input class="bg-transparent border-none text-on-surface focus:ring-0 placeholder-on-surface-variant p-0 font-body-md w-64" placeholder="Search budgets..." type="text"/>
</div>
<button class="text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="w-10 h-10 rounded-full overflow-hidden border border-glass-border cursor-pointer hover:border-primary transition-colors">
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="A futuristic, high-end profile avatar portrait of a modern tech-savvy individual. The lighting is dramatic and moody, utilizing deep navy and glowing cyan tones to match an atmospheric glassmorphism dark-mode UI. The subject looks confident, set against a blurred, abstract digital background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoLFGDwiSgGTfR_XgXaDMzOOmW6H11Lc_3dNRu8TEoLnBXnmtM3Obhi5sTfDrLM-phzg81CcrtQkLvQKRIfp8ovF9LAaLeYiVmtoHUX-qQEuXHyl5FUTXZuU_CnTgvGm2gRi21IHtiJLKeKWlCETo8wb_OCT7vFj2t9Knm__wvI-5y222K8hzX1KD7ZTC7c_PznBvOD9m7BPiGoQmz5irvQt6Z8BSyeBEtVruOu1AfxHqSixZBY_AF"/>
</div>
</div>
</header>
<!-- Page Content -->
<div class="p-6 md:p-card-padding flex-1 max-w-7xl mx-auto w-full flex flex-col gap-section-gap">
<!-- Header Section -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
<div>
<h2 class="font-display-lg text-display-lg md:text-[40px] text-on-surface tracking-tight mb-2">Active Budgets</h2>
<p class="font-body-md text-on-surface-variant">Monitor and manage your spending limits for October.</p>
</div>
<button class="glass-button text-on-surface px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 duration-200 font-label-caps text-label-caps">
<span class="material-symbols-outlined">add_circle</span>
<span>Create Budget</span>
</button>
</div>
<!-- Budgets Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
<!-- Budget Card 1: Dining Out (Healthy) -->
<div class="glass-card p-card-padding flex flex-col gap-6">
<div class="flex justify-between items-start">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary border border-glass-border">
<span class="material-symbols-outlined">restaurant</span>
</div>
<div>
<h3 class="font-headline-md text-[20px] text-on-surface">Dining Out</h3>
<p class="font-label-caps text-on-surface-variant">FOOD &amp; DRINK</p>
</div>
</div>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<div>
<div class="flex justify-between items-end mb-2">
<div class="font-data-mono text-data-mono text-on-surface-variant">Spent</div>
<div class="font-headline-md text-headline-md text-on-surface">$340 <span class="text-on-surface-variant text-[16px] font-normal">/ $500</span></div>
</div>
<div class="progress-bar-bg h-2 w-full">
<div class="progress-bar-fill h-full" style="width: 68%;"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-4 border-t border-[rgba(255,255,255,0.1)] pt-4">
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Remaining</p>
<p class="font-data-mono text-[18px] text-growth-cyan">$160.00</p>
</div>
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Daily Allowance</p>
<p class="font-data-mono text-[18px] text-on-surface">$14.54</p>
</div>
</div>
</div>
<!-- Budget Card 2: Groceries (Warning) -->
<div class="glass-card p-card-padding flex flex-col gap-6">
<div class="flex justify-between items-start">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary border border-glass-border">
<span class="material-symbols-outlined">shopping_cart</span>
</div>
<div>
<h3 class="font-headline-md text-[20px] text-on-surface">Groceries</h3>
<p class="font-label-caps text-on-surface-variant">ESSENTIALS</p>
</div>
</div>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<div>
<div class="flex justify-between items-end mb-2">
<div class="font-data-mono text-data-mono text-on-surface-variant">Spent</div>
<div class="font-headline-md text-headline-md text-on-surface">$550 <span class="text-on-surface-variant text-[16px] font-normal">/ $600</span></div>
</div>
<div class="progress-bar-bg h-2 w-full">
<div class="progress-bar-fill h-full" style="width: 91%; background: linear-gradient(90deg, #974800, #ffb688);"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-4 border-t border-[rgba(255,255,255,0.1)] pt-4">
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Remaining</p>
<p class="font-data-mono text-[18px] text-tertiary">$50.00</p>
</div>
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Daily Allowance</p>
<p class="font-data-mono text-[18px] text-on-surface">$4.54</p>
</div>
</div>
</div>
<!-- Budget Card 3: Entertainment (Over Budget) -->
<div class="glass-card glass-card-over-budget p-card-padding flex flex-col gap-6">
<div class="flex justify-between items-start">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-xl bg-error-container/30 flex items-center justify-center text-error border border-glass-border">
<span class="material-symbols-outlined">sports_esports</span>
</div>
<div>
<h3 class="font-headline-md text-[20px] text-error">Entertainment</h3>
<p class="font-label-caps text-on-surface-variant">LEISURE</p>
</div>
</div>
<button class="text-error hover:text-error-container transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<div>
<div class="flex justify-between items-end mb-2">
<div class="font-data-mono text-data-mono text-error">Spent</div>
<div class="font-headline-md text-headline-md text-error">$250 <span class="text-error/70 text-[16px] font-normal">/ $200</span></div>
</div>
<div class="progress-bar-bg h-2 w-full">
<div class="progress-bar-fill-over h-full" style="width: 100%;"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-4 border-t border-[rgba(255,255,255,0.1)] pt-4">
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Remaining</p>
<p class="font-data-mono text-[18px] text-error">-$50.00</p>
</div>
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Daily Allowance</p>
<p class="font-data-mono text-[18px] text-on-surface-variant">--</p>
</div>
</div>
</div>
</div>
<!-- Quick Insights Bento Box style area -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter mt-4">
<div class="glass-card p-card-padding md:col-span-8 flex flex-col justify-center min-h-[200px] relative overflow-hidden group">
<!-- Decorative Background blur -->
<div class="absolute -right-20 -bottom-20 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-2">Total Budget Overview</h3>
<p class="font-body-md text-on-surface-variant mb-6 w-2/3">You are currently tracking under your overall monthly limit. Maintaining this pace will result in $420 savings.</p>
<div class="flex items-end gap-6">
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Total Spent</p>
<p class="font-display-lg text-[32px] text-on-surface">$1,140</p>
</div>
<div class="h-12 w-px bg-glass-border mx-2"></div>
<div>
<p class="font-label-caps text-on-surface-variant mb-1">Total Budget</p>
<p class="font-headline-md text-headline-md text-on-surface-variant">$1,300</p>
</div>
</div>
</div>
<div class="glass-card p-card-padding md:col-span-4 flex flex-col justify-between min-h-[200px]">
<div class="flex items-center gap-3 mb-4">
<div class="w-10 h-10 rounded-full bg-glass-highlight flex items-center justify-center text-primary">
<span class="material-symbols-outlined">lightbulb</span>
</div>
<h3 class="font-headline-md text-[18px] text-on-surface">Smart Tip</h3>
</div>
<p class="font-body-md text-on-surface-variant">Your Daily Allowance dynamically adjusts based on your remaining budget and days left in the month. Stay under it to grow your remaining balance.</p>
</div>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="bg-glass-bg backdrop-blur-[10px] fixed bottom-0 w-full z-50 md:hidden border-t border-glass-border shadow-[0_-4px_24px_rgba(0,0,0,0.15)] flex justify-around items-center px-4 pb-6 pt-2 font-label-caps text-label-caps-mobile">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform w-16" href="#">
<span class="material-symbols-outlined mb-1">home</span>
<span>Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform w-16" href="#">
<span class="material-symbols-outlined mb-1">payments</span>
<span>Wallet</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform w-16" href="#">
<span class="material-symbols-outlined mb-1">history</span>
<span>History</span>
</a>
<!-- Active Tab (Budget) -->
<a class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform w-16" href="#">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">analytics</span>
<span>Budget</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform w-16" href="#">
<span class="material-symbols-outlined mb-1">menu</span>
<span>Menu</span>
</a>
</nav>
</body></html>

<!-- Budget Management (Glass UI) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "glass-border": "rgba(255, 255, 255, 0.3)",
                      "on-tertiary-container": "#ffceb1",
                      "on-secondary": "#122f5f",
                      "primary-container": "#255cb1",
                      "on-surface": "#e2e2ea",
                      "tertiary-fixed-dim": "#ffb688",
                      "inverse-surface": "#e2e2ea",
                      "on-tertiary-fixed-variant": "#733500",
                      "deep-navy": "#001a41",
                      "outline": "#8d909d",
                      "on-secondary-fixed-variant": "#2c4677",
                      "expense-rose": "#ba1a1a",
                      "background": "#111319",
                      "on-tertiary-fixed": "#311300",
                      "secondary-fixed-dim": "#adc6ff",
                      "on-tertiary": "#512400",
                      "secondary": "#adc6ff",
                      "error-container": "#93000a",
                      "primary": "#adc6ff",
                      "on-primary": "#002e69",
                      "on-secondary-fixed": "#001a42",
                      "surface-bright": "#37393f",
                      "on-secondary-container": "#9cb5ed",
                      "inverse-primary": "#255cb1",
                      "surface-container-low": "#191b21",
                      "inverse-on-surface": "#2e3036",
                      "surface-container-highest": "#33353b",
                      "primary-fixed": "#d8e2ff",
                      "surface-container-lowest": "#0c0e13",
                      "surface-variant": "#33353b",
                      "surface-tint": "#adc6ff",
                      "surface-container-high": "#282a30",
                      "surface": "#111319",
                      "tertiary-fixed": "#ffdbc7",
                      "primary-fixed-dim": "#adc6ff",
                      "on-primary-fixed": "#001a41",
                      "tertiary-container": "#974800",
                      "error": "#ffb4ab",
                      "on-error-container": "#ffdad6",
                      "on-error": "#690005",
                      "glass-bg": "rgba(255, 255, 255, 0.05)",
                      "on-background": "#e2e2ea",
                      "growth-cyan": "#49da9f",
                      "on-primary-fixed-variant": "#004493",
                      "on-primary-container": "#c8d8ff",
                      "secondary-container": "#2c4677",
                      "surface-dim": "#111319",
                      "on-surface-variant": "#c3c6d4",
                      "outline-variant": "#424752",
                      "secondary-fixed": "#d8e2ff",
                      "tertiary": "#ffb688",
                      "surface-container": "#1d2025",
                      "glass-highlight": "rgba(255, 255, 255, 0.15)"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "section-gap": "40px",
                      "unit": "4px",
                      "card-padding": "24px",
                      "margin-mobile": "20px",
                      "gutter": "24px"
              },
              "fontFamily": {
                      "headline-lg": ["Manrope"],
                      "display-lg": ["Manrope"],
                      "display-lg-mobile": ["Manrope"],
                      "label-caps": ["Manrope"],
                      "body-lg": ["Manrope"],
                      "headline-md": ["Manrope"],
                      "body-md": ["Manrope"],
                      "data-mono": ["Manrope"]
              },
              "fontSize": {
                      "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "500"}]
              }
            }
          }
        }
    </script>
<style>
        /* Custom styles for WebGL/Glassmorphism feel */
        body {
            background-color: #111319; /* matches background token */
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(37, 92, 177, 0.15) 0%, transparent 50%), /* primary-container */
                radial-gradient(circle at 85% 30%, rgba(73, 218, 159, 0.1) 0%, transparent 50%); /* growth-cyan */
            background-attachment: fixed;
            color: #e2e2ea; /* on-background */
        }
        
        .glass-card {
            background-color: rgba(255, 255, 255, 0.05); /* glass-bg */
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3); /* glass-border */
            box-shadow: 
                inset 1px 1px 0 rgba(255, 255, 255, 0.15), 
                0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .glass-card-interactive:active {
            backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.10);
            transform: scale(0.98);
            transition: all 0.2s ease;
        }

        /* Hide scrollbar for horizontal scrolling but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="antialiased min-h-screen pb-[90px] md:pb-0 md:pl-64 flex flex-col md:flex-row relative">
<!-- Desktop Side Navigation (Hidden on Mobile) -->
<nav class="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-glass-bg backdrop-blur-[5px] border-r border-glass-border shadow-2xl p-6 gap-section-gap z-40">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg">
<span class="material-symbols-outlined text-on-primary" data-icon="account_balance">account_balance</span>
</div>
<div>
<h1 class="font-display-lg text-headline-md text-primary tracking-tight">Aura Finance</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant">Premium Tracking</p>
</div>
</div>
<button class="w-full py-3 px-4 bg-primary-container/40 text-primary font-body-md rounded-xl border border-glass-border shadow-[inset_1px_1px_0_rgba(255,255,255,0.15)] hover:bg-glass-highlight transition-all active:scale-95 flex justify-center items-center gap-2">
<span class="material-symbols-outlined" data-icon="add">add</span>
            Add Transaction
        </button>
<ul class="flex flex-col gap-2 flex-grow">
<!-- Active State -->
<li>
<a class="flex items-center gap-4 px-4 py-3 text-primary bg-glass-highlight rounded-xl transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" data-icon="dashboard" data-weight="fill" style="font-variation-settings: 'FILL' 1;">dashboard</span>
                    Dashboard
                </a>
</li>
<li>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface rounded-xl transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
                    Accounts
                </a>
</li>
<li>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface rounded-xl transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
                    Transactions
                </a>
</li>
<li>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface rounded-xl transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" data-icon="category">category</span>
                    Categories
                </a>
</li>
<li>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface rounded-xl transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" data-icon="savings">savings</span>
                    Budgets
                </a>
</li>
</ul>
<ul class="flex flex-col gap-2 mt-auto">
<li>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface rounded-xl transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
                    Help
                </a>
</li>
<li>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface rounded-xl transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
                    Logout
                </a>
</li>
</ul>
</nav>
<!-- Main Content Area -->
<main class="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-8 py-6 flex flex-col gap-section-gap">
<!-- Mobile Top App Bar (Hidden on Desktop) -->
<header class="w-full sticky top-0 z-50 md:hidden flex justify-between items-center px-0 py-4 bg-glass-bg backdrop-blur-[5px] border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] -mx-margin-mobile px-margin-mobile">
<h1 class="font-display-lg-mobile text-headline-md text-primary tracking-tight">Aura Finance</h1>
<div class="flex gap-4 items-center">
<button class="text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<div class="w-8 h-8 rounded-full bg-surface-variant border border-glass-border overflow-hidden shadow-[inset_1px_1px_0_rgba(255,255,255,0.15)] cursor-pointer">
<!-- Placeholder for avatar -->
<img alt="User profile avatar" class="w-full h-full object-cover" data-alt="A stylized, high-contrast digital portrait avatar representing a tech-savvy user in a dark mode UI. Deep navy blue and stark white tones. Futuristic, clean, premium lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR1zPiKyber2CKDhYa7BjzX-eoHv5VskOHBGae50SRlfUeEGatiItDnOTvTV34k8hMapw0BJYipQowWS02raLc0Lc49GAaOIfWOqqXYJDVr0pnUwNfJSwhqcrRROkwOe_op3KbgTm3lEhXJomph6LHmBis-gw_lYaw2mgfVE5KXAjdrkjC8yz9nM7tfhH3R2THH2VY7LRLkgrne0XOUGUZlFUokcDirRxK6cbyaW1XU0YDab29sNly"/>
</div>
</div>
</header>
<!-- Hero Section: Total Balance -->
<section class="w-full pt-4 md:pt-8">
<div class="glass-card rounded-2xl p-card-padding flex flex-col items-center justify-center text-center relative overflow-hidden h-48 md:h-64 border border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
<!-- Subtle Gradient Background effect -->
<div class="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent opacity-50 z-0"></div>
<div class="relative z-10 space-y-2 w-full">
<h2 class="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">Total Balance</h2>
<div class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
<span class="text-primary mr-1">$</span>42,590<span class="text-on-surface-variant text-headline-md md:text-headline-lg ml-1">.00</span>
</div>
<div class="flex items-center justify-center gap-2 mt-4 inline-flex px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border shadow-[inset_1px_1px_0_rgba(255,255,255,0.15)]">
<span class="material-symbols-outlined text-growth-cyan text-sm" data-icon="trending_up">trending_up</span>
<span class="font-data-mono text-data-mono text-growth-cyan">+2.4%</span>
<span class="font-label-caps text-label-caps text-on-surface-variant ml-2">vs last month</span>
</div>
</div>
</div>
</section>
<!-- Horizontal Scrolling Summaries -->
<section class="w-full">
<div class="flex justify-between items-end mb-4">
<h3 class="font-headline-md text-headline-md text-on-surface">Monthly Summary</h3>
<span class="font-label-caps text-label-caps text-on-surface-variant">OCT 2023</span>
</div>
<div class="flex overflow-x-auto no-scrollbar gap-4 pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 snap-x">
<!-- Income Card -->
<div class="glass-card rounded-xl p-card-padding min-w-[240px] md:min-w-[280px] flex-shrink-0 snap-center relative overflow-hidden group">
<div class="absolute inset-0 bg-gradient-to-br from-growth-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div class="w-10 h-10 rounded-full bg-growth-cyan/20 flex items-center justify-center border border-growth-cyan/30">
<span class="material-symbols-outlined text-growth-cyan" data-icon="arrow_downward">arrow_downward</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface-variant bg-glass-bg px-3 py-1 rounded-full border border-glass-border">INCOME</span>
</div>
<div class="relative z-10">
<div class="font-headline-md text-headline-md text-on-surface mb-1">$8,240.50</div>
<div class="w-full h-1 bg-surface-variant rounded-full mt-3 overflow-hidden">
<div class="h-full bg-growth-cyan rounded-full" style="width: 70%;"></div>
</div>
</div>
</div>
<!-- Expense Card -->
<div class="glass-card rounded-xl p-card-padding min-w-[240px] md:min-w-[280px] flex-shrink-0 snap-center relative overflow-hidden group">
<div class="absolute inset-0 bg-gradient-to-br from-expense-rose/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div class="w-10 h-10 rounded-full bg-expense-rose/20 flex items-center justify-center border border-expense-rose/30">
<span class="material-symbols-outlined text-expense-rose" data-icon="arrow_upward">arrow_upward</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface-variant bg-glass-bg px-3 py-1 rounded-full border border-glass-border">EXPENSE</span>
</div>
<div class="relative z-10">
<div class="font-headline-md text-headline-md text-on-surface mb-1">$3,120.20</div>
<div class="w-full h-1 bg-surface-variant rounded-full mt-3 overflow-hidden">
<div class="h-full bg-expense-rose rounded-full" style="width: 45%;"></div>
</div>
</div>
</div>
<!-- Savings Card -->
<div class="glass-card rounded-xl p-card-padding min-w-[240px] md:min-w-[280px] flex-shrink-0 snap-center relative overflow-hidden group">
<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
<span class="material-symbols-outlined text-primary" data-icon="savings">savings</span>
</div>
<span class="font-label-caps text-label-caps text-on-surface-variant bg-glass-bg px-3 py-1 rounded-full border border-glass-border">SAVINGS</span>
</div>
<div class="relative z-10">
<div class="font-headline-md text-headline-md text-on-surface mb-1">$5,120.30</div>
<div class="w-full h-1 bg-surface-variant rounded-full mt-3 overflow-hidden">
<div class="h-full bg-primary rounded-full" style="width: 85%;"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Recent Transactions Vertical List -->
<section class="w-full pb-8">
<div class="flex justify-between items-center mb-6">
<h3 class="font-headline-md text-headline-md text-on-surface">Recent Activity</h3>
<button class="font-label-caps text-label-caps text-primary hover:text-primary-fixed transition-colors">VIEW ALL</button>
</div>
<div class="glass-card rounded-2xl overflow-hidden flex flex-col">
<!-- Transaction Item 1 -->
<div class="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)] hover:bg-glass-highlight transition-colors cursor-pointer glass-card-interactive">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant border border-glass-border shadow-sm">
<span class="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
</div>
<div>
<div class="font-body-md text-body-md text-on-surface font-medium">Whole Foods Market</div>
<div class="font-data-mono text-data-mono text-on-surface-variant text-sm mt-0.5">Groceries • Oct 24, 2:30 PM</div>
</div>
</div>
<div class="font-data-mono text-data-mono text-on-surface font-medium">-$142.50</div>
</div>
<!-- Transaction Item 2 -->
<div class="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)] hover:bg-glass-highlight transition-colors cursor-pointer glass-card-interactive">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant border border-glass-border shadow-sm">
<span class="material-symbols-outlined" data-icon="subscriptions">subscriptions</span>
</div>
<div>
<div class="font-body-md text-body-md text-on-surface font-medium">Netflix Subscription</div>
<div class="font-data-mono text-data-mono text-on-surface-variant text-sm mt-0.5">Entertainment • Oct 23, 10:00 AM</div>
</div>
</div>
<div class="font-data-mono text-data-mono text-on-surface font-medium">-$15.99</div>
</div>
<!-- Transaction Item 3 -->
<div class="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)] hover:bg-glass-highlight transition-colors cursor-pointer glass-card-interactive">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-growth-cyan/10 flex items-center justify-center text-growth-cyan border border-growth-cyan/20 shadow-sm">
<span class="material-symbols-outlined" data-icon="work">work</span>
</div>
<div>
<div class="font-body-md text-body-md text-on-surface font-medium">Acme Corp Salary</div>
<div class="font-data-mono text-data-mono text-on-surface-variant text-sm mt-0.5">Income • Oct 22, 9:00 AM</div>
</div>
</div>
<div class="font-data-mono text-data-mono text-growth-cyan font-medium">+$4,120.00</div>
</div>
<!-- Transaction Item 4 -->
<div class="flex items-center justify-between p-4 hover:bg-glass-highlight transition-colors cursor-pointer glass-card-interactive">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant border border-glass-border shadow-sm">
<span class="material-symbols-outlined" data-icon="local_cafe">local_cafe</span>
</div>
<div>
<div class="font-body-md text-body-md text-on-surface font-medium">Blue Bottle Coffee</div>
<div class="font-data-mono text-data-mono text-on-surface-variant text-sm mt-0.5">Dining • Oct 21, 8:15 AM</div>
</div>
</div>
<div class="font-data-mono text-data-mono text-on-surface font-medium">-$6.50</div>
</div>
</div>
</section>
</main>
<!-- Mobile Bottom Navigation (Hidden on Desktop) -->
<nav class="fixed bottom-0 w-full z-50 md:hidden bg-glass-bg backdrop-blur-[10px] shadow-[0_-4px_24px_rgba(0,0,0,0.15)] flex justify-around items-center px-4 pb-6 pt-2">
<!-- Active -->
<a class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 min-w-[64px] active:scale-90 transition-transform hover:bg-glass-highlight" href="#">
<span class="material-symbols-outlined mb-1" data-icon="home" data-weight="fill" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 min-w-[64px] active:scale-90 transition-transform hover:bg-glass-highlight rounded-xl" href="#">
<span class="material-symbols-outlined mb-1" data-icon="payments">payments</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider">Wallet</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 min-w-[64px] active:scale-90 transition-transform hover:bg-glass-highlight rounded-xl" href="#">
<span class="material-symbols-outlined mb-1" data-icon="history">history</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider">History</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 min-w-[64px] active:scale-90 transition-transform hover:bg-glass-highlight rounded-xl" href="#">
<span class="material-symbols-outlined mb-1" data-icon="analytics">analytics</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider">Budget</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 min-w-[64px] active:scale-90 transition-transform hover:bg-glass-highlight rounded-xl" href="#">
<span class="material-symbols-outlined mb-1" data-icon="menu">menu</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider">Menu</span>
</a>
</nav>
</body></html>

<!-- Dashboard (Glass Mobile) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Accounts</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "glass-border": "rgba(255, 255, 255, 0.3)",
                        "on-tertiary-container": "#ffceb1",
                        "on-secondary": "#122f5f",
                        "primary-container": "#255cb1",
                        "on-surface": "#e2e2ea",
                        "tertiary-fixed-dim": "#ffb688",
                        "inverse-surface": "#e2e2ea",
                        "on-tertiary-fixed-variant": "#733500",
                        "deep-navy": "#001a41",
                        "outline": "#8d909d",
                        "on-secondary-fixed-variant": "#2c4677",
                        "expense-rose": "#ba1a1a",
                        "background": "#111319",
                        "on-tertiary-fixed": "#311300",
                        "secondary-fixed-dim": "#adc6ff",
                        "on-tertiary": "#512400",
                        "secondary": "#adc6ff",
                        "error-container": "#93000a",
                        "primary": "#adc6ff",
                        "on-primary": "#002e69",
                        "on-secondary-fixed": "#001a42",
                        "surface-bright": "#37393f",
                        "on-secondary-container": "#9cb5ed",
                        "inverse-primary": "#255cb1",
                        "surface-container-low": "#191b21",
                        "inverse-on-surface": "#2e3036",
                        "surface-container-highest": "#33353b",
                        "primary-fixed": "#d8e2ff",
                        "surface-container-lowest": "#0c0e13",
                        "surface-variant": "#33353b",
                        "surface-tint": "#adc6ff",
                        "surface-container-high": "#282a30",
                        "surface": "#111319",
                        "tertiary-fixed": "#ffdbc7",
                        "primary-fixed-dim": "#adc6ff",
                        "on-primary-fixed": "#001a41",
                        "tertiary-container": "#974800",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-error": "#690005",
                        "glass-bg": "rgba(255, 255, 255, 0.05)",
                        "on-background": "#e2e2ea",
                        "growth-cyan": "#49da9f",
                        "on-primary-fixed-variant": "#004493",
                        "on-primary-container": "#c8d8ff",
                        "secondary-container": "#2c4677",
                        "surface-dim": "#111319",
                        "on-surface-variant": "#c3c6d4",
                        "outline-variant": "#424752",
                        "secondary-fixed": "#d8e2ff",
                        "tertiary": "#ffb688",
                        "surface-container": "#1d2025",
                        "glass-highlight": "rgba(255, 255, 255, 0.15)"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "section-gap": "40px",
                        "unit": "4px",
                        "card-padding": "24px",
                        "margin-mobile": "20px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Manrope"],
                        "display-lg": ["Manrope"],
                        "display-lg-mobile": ["Manrope"],
                        "label-caps": ["Manrope"],
                        "body-lg": ["Manrope"],
                        "headline-md": ["Manrope"],
                        "body-md": ["Manrope"],
                        "data-mono": ["Manrope"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700" }],
                        "label-caps-mobile": ["10px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "data-mono": ["14px", { "lineHeight": "20px", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: theme('colors.background');
            color: theme('colors.on-background');
            -webkit-font-smoothing: antialiased;
        }
        .glass-panel {
            background-color: theme('colors.glass-bg');
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            box-shadow: inset 1px 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .glass-panel:active {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.1);
            transform: scale(0.98);
        }
        .glass-fab {
            background-color: rgba(173, 198, 255, 0.5); /* Primary with opacity */
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: inset 1px 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body class="min-h-screen relative flex flex-col pb-24 md:pb-0">
<!-- Top App Bar (Mobile optimized) -->
<header class="w-full sticky top-0 z-50 bg-glass-bg backdrop-blur-[5px] border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex justify-between items-center px-6 py-4">
<h1 class="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Accounts</h1>
<div class="flex gap-4 items-center">
<span class="material-symbols-outlined text-primary hover:bg-glass-highlight transition-colors p-2 rounded-full cursor-pointer active:scale-95 duration-200">search</span>
<img alt="User profile avatar" class="w-10 h-10 rounded-full border border-glass-border object-cover" data-alt="A futuristic, high-tech stylized portrait of a user in a clean, minimalist style, with deep navy and subtle primary blue tones, matching an atmospheric glassmorphism interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6QTcMHDrsUdcF4lpXjPAT4c7nil-W1JOgrrIE0wShzQVbs2S2ETHMIHvRJ7DZAPfRyr03u7pif5Kadk8UZtoxjtN1Eg7C28GdlpSmin9IRv2qqGTG1Tgg6bqIjSfcTtZw9M-1oxtrDwdak-rc9RyRVtgVqsPfHe6XoI91VXhg7nvjlTZTmA20pJMvxNJoUYQ3SvOLKWRCHq_VqngsjVywPcXOJyP0Ys72a3SCa3ldYPHYwScsK-RR"/>
</div>
</header>
<!-- Side Navigation (Desktop hidden on mobile) -->
<nav class="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-glass-bg backdrop-blur-[5px] border-r border-glass-border shadow-2xl p-6 gap-section-gap z-40">
<div>
<h2 class="font-display-lg text-display-lg text-primary">Aura Finance</h2>
<p class="font-label-caps text-label-caps text-on-surface-variant mt-2">Premium Tracking</p>
</div>
<div class="flex-1 flex flex-col gap-2">
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-primary bg-glass-highlight transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">account_balance_wallet</span>
<span>Accounts</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">receipt_long</span>
<span>Transactions</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">category</span>
<span>Categories</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">savings</span>
<span>Budgets</span>
</a>
</div>
<button class="glass-panel py-3 rounded-xl text-primary font-headline-md text-headline-md w-full text-center">
            Add Transaction
        </button>
<div class="flex flex-col gap-2 mt-auto">
<a class="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-glass-highlight rounded-xl font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">help</span>
<span>Help</span>
</a>
<a class="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:bg-glass-highlight rounded-xl font-label-caps text-label-caps" href="#">
<span class="material-symbols-outlined">logout</span>
<span>Logout</span>
</a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 w-full md:pl-64 flex flex-col items-center px-margin-mobile pt-8 gap-section-gap max-w-3xl mx-auto">
<!-- Total Balance Overview -->
<section class="w-full glass-panel rounded-xl p-card-padding flex flex-col gap-4 relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
<h2 class="font-label-caps text-label-caps text-on-surface-variant uppercase relative z-10">Total Net Worth</h2>
<div class="flex items-end gap-2 relative z-10">
<span class="font-display-lg-mobile text-display-lg-mobile text-on-surface">$124,532.00</span>
<span class="font-body-md text-body-md text-on-surface-variant mb-1">USD</span>
</div>
<div class="flex gap-4 relative z-10 mt-2">
<div class="flex items-center gap-1 text-growth-cyan">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="font-data-mono text-data-mono">+2.4%</span>
</div>
<span class="font-body-md text-body-md text-on-surface-variant">This month</span>
</div>
</section>
<!-- Account List -->
<section class="w-full flex flex-col gap-4">
<div class="flex justify-between items-center mb-2">
<h3 class="font-headline-md text-headline-md text-on-surface">Your Accounts</h3>
<button class="text-primary font-body-md text-body-md hover:text-primary-fixed transition-colors">Edit</button>
</div>
<!-- Card 1: Bank Account -->
<div class="glass-panel rounded-xl p-4 flex items-center justify-between cursor-pointer">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-primary">account_balance</span>
</div>
<div class="flex flex-col">
<span class="font-headline-md text-headline-md text-on-surface text-[18px] leading-tight">Chase Checking</span>
<span class="font-body-md text-body-md text-on-surface-variant text-[14px]">**** 4092</span>
</div>
</div>
<div class="flex flex-col items-end">
<span class="font-data-mono text-data-mono text-on-surface text-[16px]">$8,240.50</span>
<span class="font-label-caps text-label-caps text-on-surface-variant mt-1">Available</span>
</div>
</div>
<!-- Card 2: Savings Account -->
<div class="glass-panel rounded-xl p-4 flex items-center justify-between cursor-pointer">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-growth-cyan">savings</span>
</div>
<div class="flex flex-col">
<span class="font-headline-md text-headline-md text-on-surface text-[18px] leading-tight">High-Yield Savings</span>
<span class="font-body-md text-body-md text-on-surface-variant text-[14px]">Marcus by GS</span>
</div>
</div>
<div class="flex flex-col items-end">
<span class="font-data-mono text-data-mono text-on-surface text-[16px]">$45,000.00</span>
<span class="font-label-caps text-label-caps text-on-surface-variant mt-1">Available</span>
</div>
</div>
<!-- Card 3: Crypto Wallet (Multi-currency) -->
<div class="glass-panel rounded-xl p-4 flex flex-col gap-3 cursor-pointer">
<div class="flex items-center justify-between">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-tertiary">currency_bitcoin</span>
</div>
<div class="flex flex-col">
<span class="font-headline-md text-headline-md text-on-surface text-[18px] leading-tight">Cold Wallet</span>
<span class="font-body-md text-body-md text-on-surface-variant text-[14px]">Ledger</span>
</div>
</div>
<div class="flex flex-col items-end">
<span class="font-data-mono text-data-mono text-on-surface text-[16px]">~ $70,291.50</span>
<span class="font-label-caps text-label-caps text-on-surface-variant mt-1">Total Value</span>
</div>
</div>
<div class="w-full h-px bg-white/10 my-1"></div>
<div class="flex justify-between items-center px-2">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="font-body-md text-body-md text-on-surface-variant text-[14px]">BTC</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-[14px]">1.045</span>
</div>
<div class="flex justify-between items-center px-2">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-body-md text-body-md text-on-surface-variant text-[14px]">ETH</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-[14px]">8.20</span>
</div>
</div>
<!-- Card 4: Credit Card -->
<div class="glass-panel rounded-xl p-4 flex items-center justify-between cursor-pointer">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-expense-rose">credit_card</span>
</div>
<div class="flex flex-col">
<span class="font-headline-md text-headline-md text-on-surface text-[18px] leading-tight">Amex Platinum</span>
<span class="font-body-md text-body-md text-on-surface-variant text-[14px]">**** 1004</span>
</div>
</div>
<div class="flex flex-col items-end">
<span class="font-data-mono text-data-mono text-expense-rose text-[16px]">-$1,250.00</span>
<span class="font-label-caps text-label-caps text-on-surface-variant mt-1">Balance</span>
</div>
</div>
</section>
<!-- Spacer for FAB and Bottom Nav -->
<div class="h-24"></div>
</main>
<!-- Floating Action Button (Mobile Contextual) -->
<button class="md:hidden fixed bottom-24 right-6 w-14 h-14 rounded-full glass-fab flex items-center justify-center z-40 active:scale-90 transition-transform shadow-lg">
<span class="material-symbols-outlined text-on-primary text-[28px]">add</span>
</button>
<!-- Bottom Nav Bar (Mobile Shell) -->
<nav class="fixed bottom-0 w-full z-50 md:hidden bg-glass-bg backdrop-blur-[10px] shadow-[0_-4px_24px_rgba(0,0,0,0.15)] flex justify-around items-center px-4 pb-6 pt-2">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-label-caps text-label-caps-mobile mt-1">Home</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined">payments</span>
<span class="font-label-caps text-label-caps-mobile mt-1">Wallet</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined">history</span>
<span class="font-label-caps text-label-caps-mobile mt-1">History</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-caps text-label-caps-mobile mt-1">Budget</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight rounded-xl active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined">menu</span>
<span class="font-label-caps text-label-caps-mobile mt-1">Menu</span>
</a>
</nav>
</body></html>

<!-- Accounts (Glass Mobile) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Transaction History - Aura Finance</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "glass-border": "rgba(255, 255, 255, 0.3)",
                        "on-tertiary-container": "#ffceb1",
                        "on-secondary": "#122f5f",
                        "primary-container": "#255cb1",
                        "on-surface": "#e2e2ea",
                        "tertiary-fixed-dim": "#ffb688",
                        "inverse-surface": "#e2e2ea",
                        "on-tertiary-fixed-variant": "#733500",
                        "deep-navy": "#001a41",
                        "outline": "#8d909d",
                        "on-secondary-fixed-variant": "#2c4677",
                        "expense-rose": "#ba1a1a",
                        "background": "#111319",
                        "on-tertiary-fixed": "#311300",
                        "secondary-fixed-dim": "#adc6ff",
                        "on-tertiary": "#512400",
                        "secondary": "#adc6ff",
                        "error-container": "#93000a",
                        "primary": "#adc6ff",
                        "on-primary": "#002e69",
                        "on-secondary-fixed": "#001a42",
                        "surface-bright": "#37393f",
                        "on-secondary-container": "#9cb5ed",
                        "inverse-primary": "#255cb1",
                        "surface-container-low": "#191b21",
                        "inverse-on-surface": "#2e3036",
                        "surface-container-highest": "#33353b",
                        "primary-fixed": "#d8e2ff",
                        "surface-container-lowest": "#0c0e13",
                        "surface-variant": "#33353b",
                        "surface-tint": "#adc6ff",
                        "surface-container-high": "#282a30",
                        "surface": "#111319",
                        "tertiary-fixed": "#ffdbc7",
                        "primary-fixed-dim": "#adc6ff",
                        "on-primary-fixed": "#001a41",
                        "tertiary-container": "#974800",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-error": "#690005",
                        "glass-bg": "rgba(255, 255, 255, 0.05)",
                        "on-background": "#e2e2ea",
                        "growth-cyan": "#49da9f",
                        "on-primary-fixed-variant": "#004493",
                        "on-primary-container": "#c8d8ff",
                        "secondary-container": "#2c4677",
                        "surface-dim": "#111319",
                        "on-surface-variant": "#c3c6d4",
                        "outline-variant": "#424752",
                        "secondary-fixed": "#d8e2ff",
                        "tertiary": "#ffb688",
                        "surface-container": "#1d2025",
                        "glass-highlight": "rgba(255, 255, 255, 0.15)"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "section-gap": "40px",
                        "unit": "4px",
                        "card-padding": "24px",
                        "margin-mobile": "20px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg": ["manrope"],
                        "display-lg": ["manrope"],
                        "display-lg-mobile": ["manrope"],
                        "label-caps": ["manrope"],
                        "body-lg": ["manrope"],
                        "headline-md": ["manrope"],
                        "body-md": ["manrope"],
                        "data-mono": ["manrope"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "data-mono": ["14px", { "lineHeight": "20px", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .material-symbols-outlined.filled {
            font-variation-settings: 'FILL' 1;
        }
        
        /* Glassmorphism Utilities */
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .glass-interactive:active {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transform: scale(0.98);
        }
        
        .glass-input {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.2s ease;
        }
        .glass-input:focus {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(173, 198, 255, 0.8); /* primary color */
            outline: none;
            box-shadow: 0 0 0 2px rgba(173, 198, 255, 0.2);
        }

        /* Hide scrollbar for clean UI */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body-md min-h-screen flex flex-col relative overflow-hidden">
<!-- Ambient Background Element -->
<div class="fixed top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-container/20 via-background to-background -z-10 pointer-events-none"></div>
<!-- Top App Bar (From Shared JSON) -->
<header class="w-full sticky top-0 z-50 bg-glass-bg backdrop-blur-[5px] flex justify-between items-center px-6 py-4 border-b border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
<h1 class="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Aura Finance</h1>
<div class="flex items-center gap-4">
<button class="text-primary hover:bg-glass-highlight transition-colors active:scale-95 duration-200 p-2 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="text-primary hover:bg-glass-highlight transition-colors active:scale-95 duration-200 p-2 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 overflow-y-auto no-scrollbar w-full max-w-2xl mx-auto px-margin-mobile pt-6 pb-32">
<!-- Search and Filter Header -->
<section class="mb-section-gap sticky top-0 z-40 py-2 bg-background/80 backdrop-blur-md -mx-margin-mobile px-margin-mobile">
<div class="flex gap-3">
<div class="relative flex-1">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full glass-input rounded-xl py-3 pl-12 pr-4 font-body-md text-on-surface placeholder:text-on-surface-variant" placeholder="Search transactions..." type="text"/>
</div>
<button class="glass-card rounded-xl px-4 flex items-center justify-center text-primary glass-interactive transition-all">
<span class="material-symbols-outlined">filter_list</span>
</button>
</div>
<!-- Quick Filters (Chips) -->
<div class="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
<button class="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary font-label-caps text-label-caps whitespace-nowrap">ALL</button>
<button class="px-4 py-1.5 rounded-full bg-white/10 text-on-surface font-label-caps text-label-caps whitespace-nowrap">INCOME</button>
<button class="px-4 py-1.5 rounded-full bg-white/10 text-on-surface font-label-caps text-label-caps whitespace-nowrap">EXPENSES</button>
<button class="px-4 py-1.5 rounded-full bg-white/10 text-on-surface font-label-caps text-label-caps whitespace-nowrap">SUBSCRIPTIONS</button>
</div>
</section>
<!-- Transaction List -->
<section class="flex flex-col gap-unit">
<h2 class="font-label-caps text-label-caps text-on-surface-variant mb-2 mt-2">TODAY</h2>
<!-- Expense Transaction -->
<article class="glass-card rounded-xl p-4 flex items-center justify-between glass-interactive cursor-pointer mb-2">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-glass-border">
<span class="material-symbols-outlined filled">restaurant</span>
</div>
<div>
<h3 class="font-headline-md text-[18px] leading-[24px] text-on-surface">Whole Foods</h3>
<p class="font-body-md text-[14px] text-on-surface-variant">Groceries</p>
</div>
</div>
<div class="text-right">
<p class="font-data-mono text-data-mono text-on-surface">- $142.50</p>
</div>
</article>
<!-- Income Transaction -->
<article class="glass-card rounded-xl p-4 flex items-center justify-between glass-interactive cursor-pointer mb-2 relative overflow-hidden">
<!-- Subtle green gradient for income -->
<div class="absolute top-0 right-0 w-32 h-32 bg-growth-cyan/10 blur-2xl -z-10 rounded-full"></div>
<div class="flex items-center gap-4 z-10">
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-growth-cyan border border-growth-cyan/30">
<span class="material-symbols-outlined filled">payments</span>
</div>
<div>
<h3 class="font-headline-md text-[18px] leading-[24px] text-on-surface">Acme Corp</h3>
<p class="font-body-md text-[14px] text-on-surface-variant">Salary</p>
</div>
</div>
<div class="text-right z-10">
<p class="font-data-mono text-data-mono text-growth-cyan">+ $4,250.00</p>
</div>
</article>
<h2 class="font-label-caps text-label-caps text-on-surface-variant mb-2 mt-4">YESTERDAY</h2>
<!-- Expense Transaction -->
<article class="glass-card rounded-xl p-4 flex items-center justify-between glass-interactive cursor-pointer mb-2">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-glass-border">
<span class="material-symbols-outlined filled">local_cafe</span>
</div>
<div>
<h3 class="font-headline-md text-[18px] leading-[24px] text-on-surface">Blue Bottle</h3>
<p class="font-body-md text-[14px] text-on-surface-variant">Coffee</p>
</div>
</div>
<div class="text-right">
<p class="font-data-mono text-data-mono text-on-surface">- $6.50</p>
</div>
</article>
<!-- Expense Transaction -->
<article class="glass-card rounded-xl p-4 flex items-center justify-between glass-interactive cursor-pointer mb-2">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-glass-border">
<span class="material-symbols-outlined filled">directions_car</span>
</div>
<div>
<h3 class="font-headline-md text-[18px] leading-[24px] text-on-surface">Uber</h3>
<p class="font-body-md text-[14px] text-on-surface-variant">Transport</p>
</div>
</div>
<div class="text-right">
<p class="font-data-mono text-data-mono text-on-surface">- $24.00</p>
</div>
</article>
</section>
</main>
<!-- Bottom Nav Bar (From Shared JSON) -->
<!-- Active state mapped to "History" as this is the transaction history view -->
<nav class="fixed bottom-0 w-full z-50 md:hidden bg-glass-bg backdrop-blur-[10px] shadow-[0_-4px_24px_rgba(0,0,0,0.15)] border-t-0 flex justify-around items-center px-4 pb-6 pt-2">
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl">
<span class="material-symbols-outlined mb-1" data-icon="home">home</span>
<span class="font-label-caps text-label-caps">Home</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl">
<span class="material-symbols-outlined mb-1" data-icon="payments">payments</span>
<span class="font-label-caps text-label-caps">Wallet</span>
</button>
<button class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform">
<span class="material-symbols-outlined mb-1 filled" data-icon="history" data-weight="fill">history</span>
<span class="font-label-caps text-label-caps">History</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl">
<span class="material-symbols-outlined mb-1" data-icon="analytics">analytics</span>
<span class="font-label-caps text-label-caps">Budget</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl">
<span class="material-symbols-outlined mb-1" data-icon="menu">menu</span>
<span class="font-label-caps text-label-caps">Menu</span>
</button>
</nav>
</body></html>

<!-- History (Glass Mobile) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Budgets</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "glass-border": "rgba(255, 255, 255, 0.3)",
                        "on-tertiary-container": "#ffceb1",
                        "on-secondary": "#122f5f",
                        "primary-container": "#255cb1",
                        "on-surface": "#e2e2ea",
                        "tertiary-fixed-dim": "#ffb688",
                        "inverse-surface": "#e2e2ea",
                        "on-tertiary-fixed-variant": "#733500",
                        "deep-navy": "#001a41",
                        "outline": "#8d909d",
                        "on-secondary-fixed-variant": "#2c4677",
                        "expense-rose": "#ba1a1a",
                        "background": "#111319",
                        "on-tertiary-fixed": "#311300",
                        "secondary-fixed-dim": "#adc6ff",
                        "on-tertiary": "#512400",
                        "secondary": "#adc6ff",
                        "error-container": "#93000a",
                        "primary": "#adc6ff",
                        "on-primary": "#002e69",
                        "on-secondary-fixed": "#001a42",
                        "surface-bright": "#37393f",
                        "on-secondary-container": "#9cb5ed",
                        "inverse-primary": "#255cb1",
                        "surface-container-low": "#191b21",
                        "inverse-on-surface": "#2e3036",
                        "surface-container-highest": "#33353b",
                        "primary-fixed": "#d8e2ff",
                        "surface-container-lowest": "#0c0e13",
                        "surface-variant": "#33353b",
                        "surface-tint": "#adc6ff",
                        "surface-container-high": "#282a30",
                        "surface": "#111319",
                        "tertiary-fixed": "#ffdbc7",
                        "primary-fixed-dim": "#adc6ff",
                        "on-primary-fixed": "#001a41",
                        "tertiary-container": "#974800",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-error": "#690005",
                        "glass-bg": "rgba(255, 255, 255, 0.05)",
                        "on-background": "#e2e2ea",
                        "growth-cyan": "#49da9f",
                        "on-primary-fixed-variant": "#004493",
                        "on-primary-container": "#c8d8ff",
                        "secondary-container": "#2c4677",
                        "surface-dim": "#111319",
                        "on-surface-variant": "#c3c6d4",
                        "outline-variant": "#424752",
                        "secondary-fixed": "#d8e2ff",
                        "tertiary": "#ffb688",
                        "surface-container": "#1d2025",
                        "glass-highlight": "rgba(255, 255, 255, 0.15)"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "section-gap": "40px",
                        "unit": "4px",
                        "card-padding": "24px",
                        "margin-mobile": "20px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Manrope", "sans-serif"],
                        "display-lg": ["Manrope", "sans-serif"],
                        "display-lg-mobile": ["Manrope", "sans-serif"],
                        "label-caps": ["Manrope", "sans-serif"],
                        "body-lg": ["Manrope", "sans-serif"],
                        "headline-md": ["Manrope", "sans-serif"],
                        "body-md": ["Manrope", "sans-serif"],
                        "data-mono": ["Manrope", "sans-serif"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "data-mono": ["14px", { "lineHeight": "20px", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-surface font-body-md min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
<!-- Atmospheric Background Effects -->
<div class="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
<div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]"></div>
<div class="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/5 blur-[120px]"></div>
</div>
<!-- Mobile Top App Bar -->
<header class="w-full sticky top-0 z-50 bg-glass-bg backdrop-blur-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex justify-between items-center px-6 py-4 md:hidden">
<div class="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Aura Finance</div>
<div class="flex items-center gap-4">
<button class="text-primary hover:bg-glass-highlight transition-colors p-2 rounded-full active:scale-95 duration-200">
<span aria-label="Notifications" class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="text-primary hover:bg-glass-highlight transition-colors p-2 rounded-full active:scale-95 duration-200">
<span aria-label="Settings" class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<img alt="User profile avatar" class="w-8 h-8 rounded-full border border-glass-border object-cover" data-alt="A stylized, low-poly 3d rendering of a futuristic avatar profile picture, featuring glowing blue and silver tones, set against a dark glassmorphism background. The mood is sophisticated and tech-forward. High quality, 4k resolution, smooth shading." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbUo-fcEA9CVKO9eSV6k8RMOQR946I2XQ74L-vGdmHNq4-XD36N7FopshXkWdqfhh1oBf27MFAauPKdU9b6LRA4ISyOOMFI4gZAe_gzPESVYnckasyknz7AVpi4GRSchJ8hS1nx3OuTljvTRxw3I0suA7i_lDpphQ3dmYlWrffELx795ysArZNg5nhPIiF-_K0iNdT9vYm7LYjHG2FR6kquW_497DAV2zRuhh5In23eiUFcPwaUDOr"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-grow px-margin-mobile pt-8 pb-32 flex flex-col gap-section-gap max-w-md mx-auto w-full md:hidden">
<!-- Daily Allowance Highlight -->
<section class="flex flex-col gap-4">
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Budgets</h1>
<div class="bg-glass-bg backdrop-blur-[5px] border border-glass-border rounded-xl p-card-padding shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col items-center justify-center text-center group transition-all duration-300">
<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
<!-- Edge Refraction Highlight -->
<div class="absolute inset-0 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.15)] rounded-xl pointer-events-none"></div>
<p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest relative z-10 mb-2">Daily Allowance</p>
<div class="font-display-lg-mobile text-display-lg-mobile text-primary relative z-10 mb-4">$84.50</div>
<div class="w-full bg-surface-container-high rounded-full h-2 relative z-10 overflow-hidden">
<div class="bg-primary h-full rounded-full w-[45%] relative">
<div class="absolute inset-0 bg-glass-highlight w-full h-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
</div>
</div>
<div class="w-full flex justify-between mt-2 font-data-mono text-data-mono text-on-surface-variant relative z-10">
<span>$1,200 Left</span>
<span>14 Days</span>
</div>
</div>
</section>
<!-- Category Budgets -->
<section class="flex flex-col gap-6">
<h2 class="font-headline-md text-headline-md text-on-surface">Categories</h2>
<!-- Budget Card 1: Healthy -->
<div class="bg-glass-bg backdrop-blur-[5px] border border-glass-border rounded-xl p-card-padding shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden">
<div class="absolute inset-0 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.15)] rounded-xl pointer-events-none"></div>
<div class="flex justify-between items-center mb-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
</div>
<div>
<h3 class="font-body-lg text-body-lg text-on-surface">Dining</h3>
<p class="font-data-mono text-data-mono text-on-surface-variant">$250 / $500</p>
</div>
</div>
<div class="font-data-mono text-data-mono text-growth-cyan">50%</div>
</div>
<div class="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
<div class="bg-growth-cyan h-full rounded-full w-[50%] relative">
<div class="absolute inset-0 bg-glass-highlight w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
</div>
</div>
</div>
<!-- Budget Card 2: Warning -->
<div class="bg-glass-bg backdrop-blur-[5px] border border-glass-border rounded-xl p-card-padding shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden">
<div class="absolute inset-0 bg-error/5 opacity-50"></div>
<div class="absolute inset-0 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.15)] rounded-xl pointer-events-none"></div>
<div class="flex justify-between items-center mb-4 relative z-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</div>
<div>
<h3 class="font-body-lg text-body-lg text-on-surface">Shopping</h3>
<p class="font-data-mono text-data-mono text-on-surface-variant">$380 / $400</p>
</div>
</div>
<div class="font-data-mono text-data-mono text-tertiary">95%</div>
</div>
<div class="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden relative z-10">
<div class="bg-tertiary h-full rounded-full w-[95%] relative">
<div class="absolute inset-0 bg-glass-highlight w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
</div>
</div>
<p class="font-label-caps text-label-caps text-tertiary mt-3 relative z-10 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]" data-icon="warning">warning</span> Nearing Limit
                </p>
</div>
<!-- Budget Card 3: Over Budget -->
<div class="bg-glass-bg backdrop-blur-[5px] border border-error/30 rounded-xl p-card-padding shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden group">
<div class="absolute inset-0 bg-error/10 opacity-70"></div>
<div class="absolute inset-0 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.15)] rounded-xl pointer-events-none"></div>
<div class="flex justify-between items-center mb-4 relative z-10">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-error-container/40 flex items-center justify-center text-error">
<span class="material-symbols-outlined" data-icon="local_taxi">local_taxi</span>
</div>
<div>
<h3 class="font-body-lg text-body-lg text-error">Transit</h3>
<p class="font-data-mono text-data-mono text-error/80">$180 / $150</p>
</div>
</div>
<div class="font-data-mono text-data-mono text-error">120%</div>
</div>
<div class="w-full bg-error-container/20 rounded-full h-1.5 overflow-hidden relative z-10">
<div class="bg-error h-full rounded-full w-full relative">
<div class="absolute inset-0 bg-glass-highlight w-full h-full animate-[pulse_2s_infinite]"></div>
</div>
</div>
<p class="font-label-caps text-label-caps text-error mt-3 relative z-10 flex items-center gap-1 uppercase tracking-widest">
<span class="material-symbols-outlined text-[14px]" data-icon="error">error</span> Over Budget by $30
                </p>
</div>
</section>
</main>
<!-- Mobile Bottom NavBar -->
<nav class="fixed bottom-0 w-full z-50 md:hidden bg-glass-bg backdrop-blur-[10px] shadow-[0_-4px_24px_rgba(0,0,0,0.15)] flex justify-around items-center px-4 pb-6 pt-2">
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl group w-16">
<span class="material-symbols-outlined mb-1 group-hover:text-primary transition-colors" data-icon="home">home</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider group-hover:text-primary transition-colors">Home</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl group w-16">
<span class="material-symbols-outlined mb-1 group-hover:text-primary transition-colors" data-icon="payments">payments</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider group-hover:text-primary transition-colors">Wallet</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl group w-16">
<span class="material-symbols-outlined mb-1 group-hover:text-primary transition-colors" data-icon="history">history</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider group-hover:text-primary transition-colors">History</span>
</button>
<button class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform w-16 border border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
<span class="material-symbols-outlined mb-1" data-icon="analytics" data-weight="fill" style="font-variation-settings: 'FILL' 1;">analytics</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider font-bold">Budget</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl group w-16">
<span class="material-symbols-outlined mb-1 group-hover:text-primary transition-colors" data-icon="menu">menu</span>
<span class="font-label-caps text-[10px] uppercase tracking-wider group-hover:text-primary transition-colors">Menu</span>
</button>
</nav>
<style>
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    </style>
</body></html>

<!-- Budgets (Glass Mobile) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Aura Finance - Categories</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "glass-border": "rgba(255, 255, 255, 0.3)",
                        "on-tertiary-container": "#ffceb1",
                        "on-secondary": "#122f5f",
                        "primary-container": "#255cb1",
                        "on-surface": "#e2e2ea",
                        "tertiary-fixed-dim": "#ffb688",
                        "inverse-surface": "#e2e2ea",
                        "on-tertiary-fixed-variant": "#733500",
                        "deep-navy": "#001a41",
                        "outline": "#8d909d",
                        "on-secondary-fixed-variant": "#2c4677",
                        "expense-rose": "#ba1a1a",
                        "background": "#111319",
                        "on-tertiary-fixed": "#311300",
                        "secondary-fixed-dim": "#adc6ff",
                        "on-tertiary": "#512400",
                        "secondary": "#adc6ff",
                        "error-container": "#93000a",
                        "primary": "#adc6ff",
                        "on-primary": "#002e69",
                        "on-secondary-fixed": "#001a42",
                        "surface-bright": "#37393f",
                        "on-secondary-container": "#9cb5ed",
                        "inverse-primary": "#255cb1",
                        "surface-container-low": "#191b21",
                        "inverse-on-surface": "#2e3036",
                        "surface-container-highest": "#33353b",
                        "primary-fixed": "#d8e2ff",
                        "surface-container-lowest": "#0c0e13",
                        "surface-variant": "#33353b",
                        "surface-tint": "#adc6ff",
                        "surface-container-high": "#282a30",
                        "surface": "#111319",
                        "tertiary-fixed": "#ffdbc7",
                        "primary-fixed-dim": "#adc6ff",
                        "on-primary-fixed": "#001a41",
                        "tertiary-container": "#974800",
                        "error": "#ffb4ab",
                        "on-error-container": "#ffdad6",
                        "on-error": "#690005",
                        "glass-bg": "rgba(255, 255, 255, 0.05)",
                        "on-background": "#e2e2ea",
                        "growth-cyan": "#49da9f",
                        "on-primary-fixed-variant": "#004493",
                        "on-primary-container": "#c8d8ff",
                        "secondary-container": "#2c4677",
                        "surface-dim": "#111319",
                        "on-surface-variant": "#c3c6d4",
                        "outline-variant": "#424752",
                        "secondary-fixed": "#d8e2ff",
                        "tertiary": "#ffb688",
                        "surface-container": "#1d2025",
                        "glass-highlight": "rgba(255, 255, 255, 0.15)"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "section-gap": "40px",
                        "unit": "4px",
                        "card-padding": "24px",
                        "margin-mobile": "20px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Manrope", "sans-serif"],
                        "display-lg": ["Manrope", "sans-serif"],
                        "display-lg-mobile": ["Manrope", "sans-serif"],
                        "label-caps": ["Manrope", "sans-serif"],
                        "body-lg": ["Manrope", "sans-serif"],
                        "headline-md": ["Manrope", "sans-serif"],
                        "body-md": ["Manrope", "sans-serif"],
                        "data-mono": ["Manrope", "monospace"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "data-mono": ["14px", { "lineHeight": "20px", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: theme('colors.background');
            color: theme('colors.on-background');
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(37, 92, 177, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(73, 218, 159, 0.05) 0%, transparent 50%);
            background-attachment: fixed;
        }

        .glass-panel {
            background-color: theme('colors.glass-bg');
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid theme('colors.glass-border');
            box-shadow: inset 1px 1px 0px 0px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .glass-panel-interactive:active {
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transform: scale(0.98);
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }

        /* Scrollbar Hiding for cleaner UI */
        ::-webkit-scrollbar {
            display: none;
        }
        * {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="antialiased min-h-screen flex flex-col relative pb-24 md:pb-0">
<!-- Ambient Glow Objects -->
<div class="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
<div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary-container opacity-20 blur-[100px]"></div>
<div class="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary-container opacity-20 blur-[100px]"></div>
</div>
<!-- Top App Bar (Web / Hidden on Mobile) -->
<header class="hidden md:flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 bg-glass-bg backdrop-blur-[5px] border-b border-transparent shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-colors duration-300">
<div class="flex items-center gap-4">
<span class="font-display-lg text-display-lg text-primary tracking-tight">Aura Finance</span>
</div>
<nav class="flex gap-6">
<a class="text-on-surface-variant font-medium hover:bg-glass-highlight transition-colors px-3 py-1 rounded-full" href="#">Dashboard</a>
<a class="text-on-surface-variant font-medium hover:bg-glass-highlight transition-colors px-3 py-1 rounded-full" href="#">Accounts</a>
<a class="text-on-surface-variant font-medium hover:bg-glass-highlight transition-colors px-3 py-1 rounded-full" href="#">Transactions</a>
<a class="text-primary font-bold border-b-2 border-primary px-3 py-1" href="#">Categories</a>
<a class="text-on-surface-variant font-medium hover:bg-glass-highlight transition-colors px-3 py-1 rounded-full" href="#">Budgets</a>
</nav>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-glass-highlight transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined text-primary" data-icon="notifications">notifications</span>
</button>
<button class="p-2 rounded-full hover:bg-glass-highlight transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined text-primary" data-icon="settings">settings</span>
</button>
<img class="w-10 h-10 rounded-full object-cover border border-glass-border" data-alt="A futuristic, high-resolution 3D rendered avatar of a modern tech user, illuminated by soft blue and white neon lights, matching the atmospheric glassmorphism aesthetic of the UI. Highly detailed, clean edges." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzH5yfm81fmVNM8nqxvPNvS4xiERhsysHrLup4BLnfGuEhfgvQ0tZD02dixZS0Fvks3C1CvKG7Ed0MHcym2RNHNEulWfBATfx7bZQHK9HEeBPpVUqdFfwL-qWQ4KA1OwiEiZRLpwTf6XC2pi1Hj-hGGYmugoxHHh4ISayEpYbkijlQ_vkjACGclUz6b7pXRKZQl8m_ibOpLYoJz1gF2DDGwdm9WYPaHQXjUe904S6bd73CbSLnovTM"/>
</div>
</header>
<!-- Side NavBar (Web / Hidden on Mobile) -->
<aside class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-glass-bg backdrop-blur-[5px] border-r border-transparent shadow-2xl p-6 gap-section-gap z-40">
<div class="mt-20">
<div class="flex items-center gap-3 mb-10">
<div class="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center border border-glass-border">
<span class="material-symbols-outlined text-primary" data-icon="auto_awesome">auto_awesome</span>
</div>
<div>
<h1 class="font-headline-md text-headline-md text-on-surface">Aura</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant">Premium Tracking</p>
</div>
</div>
<nav class="flex flex-col gap-2">
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
<span class="font-label-caps text-label-caps">Accounts</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span class="font-label-caps text-label-caps">Transactions</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-primary bg-glass-highlight transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="category">category</span>
<span class="font-label-caps text-label-caps">Categories</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="savings">savings</span>
<span class="font-label-caps text-label-caps">Budgets</span>
</a>
</nav>
</div>
<div class="mt-auto flex flex-col gap-2">
<button class="w-full glass-panel glass-panel-interactive py-3 rounded-xl font-label-caps text-label-caps text-primary mb-4 flex justify-center items-center gap-2">
<span class="material-symbols-outlined text-[18px]">add</span> Add Transaction
            </button>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
<a class="flex items-center gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-glass-highlight hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="flex-1 w-full max-w-4xl mx-auto px-margin-mobile md:pl-[calc(256px+24px)] md:pr-gutter pt-8 pb-12 flex flex-col gap-section-gap">
<!-- Header Section -->
<div class="flex flex-col gap-2 md:gap-4 md:mt-8">
<h1 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Categories</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Manage your tracking categories.</p>
</div>
<!-- Tab Toggle -->
<div class="glass-panel p-1 rounded-full flex justify-between relative max-w-md w-full">
<div class="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-primary-container/40 rounded-full transition-transform duration-300 ease-in-out border border-glass-border" id="tab-indicator"></div>
<button class="flex-1 py-2 z-10 text-center font-label-caps text-label-caps text-on-primary-container transition-colors duration-300" id="btn-expense" onclick="switchTab('expense')">Expense</button>
<button class="flex-1 py-2 z-10 text-center font-label-caps text-label-caps text-on-surface-variant transition-colors duration-300" id="btn-income" onclick="switchTab('income')">Income</button>
</div>
<!-- Categories Grid (Expense) -->
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-opacity duration-300" id="grid-expense">
<!-- Add New -->
<button class="glass-panel glass-panel-interactive rounded-xl p-card-padding flex flex-col items-center justify-center gap-3 h-32 border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
<div class="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="add">add</span>
</div>
<span class="font-label-caps text-label-caps text-primary">New Category</span>
</button>
<!-- Category Items -->
<div class="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-32 relative group">
<button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-glass-highlight">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="edit">edit</span>
</button>
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-expense-rose text-[24px]" data-icon="restaurant">restaurant</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-center leading-tight">Food &amp; Dining</span>
</div>
<div class="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-32 relative group">
<button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-glass-highlight">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="edit">edit</span>
</button>
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-primary text-[24px]" data-icon="commute">commute</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-center leading-tight">Transportation</span>
</div>
<div class="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-32 relative group">
<button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-glass-highlight">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="edit">edit</span>
</button>
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-tertiary text-[24px]" data-icon="shopping_bag">shopping_bag</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-center leading-tight">Shopping</span>
</div>
<div class="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-32 relative group">
<button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-glass-highlight">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="edit">edit</span>
</button>
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-on-surface-variant text-[24px]" data-icon="home">home</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-center leading-tight">Housing</span>
</div>
<div class="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-32 relative group">
<button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-glass-highlight">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="edit">edit</span>
</button>
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-secondary text-[24px]" data-icon="movie">movie</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-center leading-tight">Entertainment</span>
</div>
</div>
<!-- Categories Grid (Income - Hidden by default) -->
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 hidden opacity-0 transition-opacity duration-300" id="grid-income">
<!-- Add New -->
<button class="glass-panel glass-panel-interactive rounded-xl p-card-padding flex flex-col items-center justify-center gap-3 h-32 border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
<div class="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="add">add</span>
</div>
<span class="font-label-caps text-label-caps text-primary">New Category</span>
</button>
<!-- Category Items -->
<div class="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-32 relative group">
<button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-glass-highlight">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="edit">edit</span>
</button>
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-growth-cyan text-[24px]" data-icon="payments">payments</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-center leading-tight">Salary</span>
</div>
<div class="glass-panel rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-32 relative group">
<button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-glass-highlight">
<span class="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="edit">edit</span>
</button>
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-secondary text-[24px]" data-icon="trending_up">trending_up</span>
</div>
<span class="font-data-mono text-data-mono text-on-surface text-center leading-tight">Investments</span>
</div>
</div>
</main>
<!-- Bottom NavBar (Mobile / Hidden on Web) -->
<nav class="fixed bottom-0 w-full z-50 md:hidden bg-glass-bg backdrop-blur-[10px] border-t border-transparent shadow-[0_-4px_24px_rgba(0,0,0,0.15)] flex justify-around items-center px-4 pb-6 pt-2">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-label-caps text-label-caps mt-1 text-[10px]">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="font-label-caps text-label-caps mt-1 text-[10px]">Wallet</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="history">history</span>
<span class="font-label-caps text-label-caps mt-1 text-[10px]">History</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary-container/40 text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="category">category</span>
<span class="font-label-caps text-label-caps mt-1 text-[10px]">Categories</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-glass-highlight active:scale-90 transition-transform rounded-xl" href="#">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
<span class="font-label-caps text-label-caps mt-1 text-[10px]">Menu</span>
</a>
</nav>
<script>
        function switchTab(tab) {
            const indicator = document.getElementById('tab-indicator');
            const btnExpense = document.getElementById('btn-expense');
            const btnIncome = document.getElementById('btn-income');
            const gridExpense = document.getElementById('grid-expense');
            const gridIncome = document.getElementById('grid-income');

            if (tab === 'income') {
                indicator.style.transform = 'translateX(100%)';
                btnExpense.classList.replace('text-on-primary-container', 'text-on-surface-variant');
                btnIncome.classList.replace('text-on-surface-variant', 'text-on-primary-container');
                
                gridExpense.classList.add('opacity-0');
                setTimeout(() => {
                    gridExpense.classList.add('hidden');
                    gridIncome.classList.remove('hidden');
                    // Trigger reflow
                    void gridIncome.offsetWidth;
                    gridIncome.classList.remove('opacity-0');
                }, 150);

            } else {
                indicator.style.transform = 'translateX(0)';
                btnIncome.classList.replace('text-on-primary-container', 'text-on-surface-variant');
                btnExpense.classList.replace('text-on-surface-variant', 'text-on-primary-container');

                gridIncome.classList.add('opacity-0');
                setTimeout(() => {
                    gridIncome.classList.add('hidden');
                    gridExpense.classList.remove('hidden');
                    // Trigger reflow
                    void gridExpense.offsetWidth;
                    gridExpense.classList.remove('opacity-0');
                }, 150);
            }
        }
    </script>
</body></html>