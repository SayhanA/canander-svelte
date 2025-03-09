<script>
    // @ts-nocheck
    
    
        const days = Array.from({ length: 31 }, (_, i) => i + 1);
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: currentYear - 1904 }, (_, i) => currentYear - i);
    
        let selectedDay = 1;
        let selectedMonth = 'Jan';
        let selectedYear = currentYear;
    
        let age = null;
        let fullAge = "";
        let errorMessage = "";
    
        const monthDays = {
            'Jan': 31, 'Feb': 28, 'Mar': 31, 'Apr': 30, 'May': 31, 'Jun': 30,
            'Jul': 31, 'Aug': 31, 'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31
        };
    
        function getMonthNumber(month) {
            return months.indexOf(month) + 1;
        }
    
        function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        }
    
        function calculateAge() {
            errorMessage = "";
            age = null;
            fullAge = "";
    
            let maxDays = monthDays[selectedMonth];
    
            if (selectedMonth === 'Feb') {
                maxDays = isLeapYear(selectedYear) ? 29 : 28;
            }
    
            if (selectedDay > maxDays) {
                errorMessage = `Invalid day! ${selectedMonth} has only ${maxDays} days.`;
                return;
            }
    
            const birthDate = new Date(selectedYear, getMonthNumber(selectedMonth) - 1, selectedDay);
            const today = new Date();
    
            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();
    
            if (days < 0) {
                months--;
                days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
    
            if (years < 12) {
                errorMessage = "You must be at least 12 years old.";
                return;
            }
    
            age = `Your age is: ${years} years, ${months} months, ${days} days`;
        }
    </script>
    
    <div>
        <div class="flex min-h-full w-full flex-col py-12 sm:px-6 lg:px-8">
            <div class="flex w-full items-center justify-between">
                <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
                    Date of Birth (Age minimum 12 years)
                </h2>
            </div>
    
            <div class="pb-2 text-left">
                <div class="text-gray-900" id="birth-head">Date of Birth</div>
                <div class="flex justify-between gap-5">
                    <!-- Day Selector -->
                    <div class="flex w-full items-center justify-between gap-5 rounded-[6px] border border-[#ccd0d5] p-1.5">
                        <label class="date_lbl" for="day">Day</label>
                        <select id="day" class="date_input ml-auto outline-none dark:text-gray-900" bind:value={selectedDay} on:change={calculateAge}>
                            {#each days as day}
                                <option value={day}>{day}</option>
                            {/each}
                        </select>
                    </div>
    
                    <!-- Month Selector -->
                    <div class="flex w-full items-center justify-between gap-5 rounded-[6px] border border-[#ccd0d5] p-1.5">
                        <label class="date_lbl" for="month">Month</label>
                        <select id="month" class="date_input outline-none dark:text-gray-900" bind:value={selectedMonth} on:change={calculateAge}>
                            {#each months as month}
                                <option value={month}>{month}</option>
                            {/each}
                        </select>
                    </div>
    
                    <!-- Year Selector -->
                    <div class="flex w-full items-center justify-between gap-5 rounded-[6px] border border-[#ccd0d5] p-1.5">
                        <label class="date_lbl" for="year">Year</label>
                        <select id="year" class="date_input outline-none dark:text-gray-900" bind:value={selectedYear} on:change={calculateAge}>
                            {#each years as year}
                                <option value={year}>{year}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
    
            <!-- Display Selected Date -->
            <h1 class="mt-5 text-xl font-semibold">Selected Birth Date:</h1>
            <p>Day: {selectedDay}</p>
            <p>Month: {selectedMonth}</p>
            <p>Year: {selectedYear}</p>
    
            <!-- Display Age or Error -->
            {#if errorMessage}
                <h2 class="mt-3 text-lg font-bold text-red-600">{errorMessage}</h2>
            {:else if age}
                <h2 class="mt-3 text-lg font-bold text-blue-600">{age}</h2>
                <p class="text-gray-700">{fullAge}</p>
            {/if}
        </div>
    </div>
    