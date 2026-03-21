const ModuleZero = {
    //
    description: "The absolute beginning. What programming actually is, how computers 'think' (they don't), what compilers do, and why C is still haunting us. Start here if you've never coded before, or if you think HTML is a programming language.",
    
    lessons: [
        {
            id: "what-is-programming", //
            title: "What is a Programming Language?", //
            explanation: "A programming language exists because there is an enormous gap between how humans think and how hardware operates. Humans think in intentions — 'add these two numbers', 'if the user is logged in, show their dashboard'. Hardware operates in electrical pulses on billions of tiny metal gates. A programming language is the bridge: a system of notation close enough to human thought that you can express ideas clearly, but precise enough that a tool called a compiler can mechanically translate those ideas into hardware instructions. The reason there are hundreds of programming languages is that different problems require different trade-offs between that closeness-to-human and closeness-to-machine. C sits intentionally close to the machine — and that is precisely why it is worth learning.", //
            sections: [
                {
                    title: "The Translation Chain", //
                    content: "The CPU in your computer executes machine code — sequences of numbers that represent primitive operations like 'load this value into register 3' or 'jump to address 0x4020 if the zero flag is set'. Nobody writes software that way anymore because it is impossibly tedious and completely tied to one specific processor design. Programming languages exist to let you express programs in a human-readable form, then translate that form down to machine code automatically. The translation approach determines a language's character: translating all at once before running (compilation) produces fast programs; translating line-by-line while running (interpretation) produces flexible, slower ones.", //
                    points: [
                        "<strong>High-level languages (Python, JavaScript, Ruby)</strong>: Prioritise developer speed and safety. The language runtime handles memory, types, and most error conditions for you. The cost is performance overhead and reduced control over what the machine actually does.",
                        "<strong>Mid-level languages (C, C++, Rust)</strong>: Give you direct control over memory layout, hardware registers, and execution speed, while still letting you write readable code with named functions and structured control flow. The cost is responsibility — when something goes wrong, it's your problem.",
                        "<strong>Low-level (Assembly, machine code)</strong>: You write instructions the CPU executes directly. Every register allocation, every memory address is your decision. Maximum control; minimum sanity. Operating systems and compilers are partly written in it, but almost nothing else is.",
                        "<strong>The translation layer (compilers and interpreters)</strong>: The compiler reads your entire source file, checks it for correctness, optimises it, and produces a standalone executable. The interpreter reads and executes one instruction at a time at runtime. C uses a compiler — the result is a binary that runs at full hardware speed with no runtime overhead."
                    ]
                },
                {
                    title: "Why Have Programming Languages At All?", //
                    content: "The earliest computers were programmed by physically rewiring them. Then came machine code — numeric opcodes entered by hand on toggle switches. Then assembly — symbolic names for those opcodes, still one-to-one with hardware instructions. Programming in assembly is extraordinarily tedious: writing something as simple as 'multiply two numbers and store the result' takes five to ten instructions and you must reason about registers, flags, and stack frames at all times. The entire motivation for high-level languages was to let programmers express intent — 'compute the area of a circle' — without specifying every machine-level step required to do it.", //
                    points: [
                        "<strong>Abstraction</strong>: You write <code>result = a + b</code>. The compiler figures out which registers to use, whether to use an ADD or ADDI instruction, and how to handle the result. Without abstraction you specify every one of those decisions yourself, in a different way on every CPU architecture.",
                        "<strong>Readability and maintainability</strong>: Code is read far more often than it is written. Named variables, functions with descriptive names, and structured control flow (<code>if</code>, <code>while</code>) make programs comprehensible to humans weeks or years after they were written. Assembly code six months old is archaeology.",
                        "<strong>Portability</strong>: Assembly code written for an x86 CPU will not run on an ARM chip. C source code written in 1985 compiles and runs on x86, ARM, RISC-V, MIPS, and dozens of other architectures — the compiler handles the translation to each target's instruction set.",
                        "<strong>Correctness</strong>: The compiler can catch a large class of errors — type mismatches, misspelled names, unreachable code — before the program ever runs. A machine code programmer has no such safety net."
                    ]
                },
                {
                    title: "Where Does C Fit?", //
                    content: "C occupies a unique position in the spectrum. It is high-level enough that you write readable, structured code — named functions, loops, conditionals, complex data structures. It is low-level enough that you directly control memory layout, manually allocate and free heap memory, read and write individual bytes, and interact with hardware at the register level. No other widely-used language sits exactly at this point. This is why C became the language of operating systems, compilers, databases, embedded firmware, network stacks, and virtual machines. Every one of those domains needs both human-expressible logic and direct hardware control — C provides both without compromise.", //
                    points: [
                        "<strong>Portability without abstraction cost</strong>: C compiles to native machine code on every platform. Unlike Java (which runs on a virtual machine) or Python (which is interpreted), there is no runtime layer consuming CPU cycles. A well-written C program is typically within a few percent of the theoretical maximum speed for the hardware.",
                        "<strong>Predictable memory model</strong>: C gives you direct visibility into how your data is laid out in memory — struct member offsets, pointer sizes, alignment requirements. This is essential for writing device drivers, protocol parsers, and anything that needs to interact with hardware or the OS at the byte level.",
                        "<strong>Longevity</strong>: C code from the 1980s compiles today. The language is standardised (C89, C99, C11, C17, C23) and has a stable core that essentially never breaks backwards compatibility. An investment in C knowledge does not depreciate.",
                        "<strong>The price of control</strong>: C trusts you completely. It will not tell you when you read past the end of an array, access freed memory, or overflow an integer. These are not language limitations — they are the deliberate absence of overhead. Understanding when and why these things happen is the entire purpose of studying C."
                    ]
                }
            ]
        },
        {
            id: "binary-and-base2", //
            title: "Why Do Computers Use Base 2?", //
            explanation: "Before you can understand what C code does to memory, you need to understand what memory actually is. Every variable you declare, every value you store, every instruction your program executes — all of it is ultimately a pattern of binary digits inside hardware that has exactly two stable electrical states. This is not an arbitrary design choice. It is a fundamental consequence of physics, and everything about how computers work flows from it.", //
            sections: [
                {
                    title: "Base 10 vs Base 2: The Counting System", //
                    content: "A number base is just an agreement about how many distinct digit symbols you use before you start combining them. Base 10 uses ten symbols (0–9) because humans have ten fingers — a convenience that became convention. Computers use base 2 for a physical reason: the components that store and transmit information inside a computer are transistors, and a transistor has two stable states — conducting current (on) or not conducting current (off). That physical binary reality maps directly to the mathematical binary system. Every number, every character, every instruction in your computer is stored as a pattern of on/off states.", //
                    points: [
                        "<strong>Base 10 (decimal)</strong>: Uses digits 0–9. The number 247 means (2 × 100) + (4 × 10) + (7 × 1). Each position is a power of 10.",
                        "<strong>Base 2 (binary)</strong>: Uses digits 0 and 1 only. The number 247 in binary is 11110111, meaning (1×128) + (1×64) + (1×32) + (1×16) + (0×8) + (1×4) + (1×2) + (1×1) = 247. Same value, different notation.",
                        "<strong>Why binary takes more digits</strong>: With only two symbols, you need more digits to represent the same number. 247 takes 3 decimal digits but 8 binary digits. This is fine — the hardware compensates with billions of transistors switching at billions of times per second."
                    ]
                },
                {
                    title: "Why Base 2? It's All About Hardware", //
                    content: "Imagine trying to build a storage device that reliably distinguishes ten voltage levels — 0V, 0.5V, 1.0V, 1.5V... up to 4.5V. Any noise on the wire, any temperature variation, any manufacturing imperfection, and you might misread 1.5V as 1.0V. That is a data corruption. Now imagine only two states: below 2.5V means 0, above 2.5V means 1. A huge margin of error. Enormous noise tolerance. This is why every reliable digital system in history has used binary. The physics of reliable electronics essentially mandates it.", //
                    points: [
                        "<strong>Physical mapping</strong>: A transistor either conducts current (1) or does not (0). The digital logic built from transistors reads this as a high or low voltage. This is binary by nature, not by choice.",
                        "<strong>Error resistance</strong>: With two states separated by a large voltage margin, you can tolerate significant noise, temperature drift, and manufacturing variation before a bit is misread. This is why modern CPUs can reliably execute billions of operations per second without constant data corruption.",
                        "<strong>Speed</strong>: Testing 'is the voltage above or below a threshold' is an extremely fast operation at the transistor level. Testing 'which of ten exact voltage levels is this?' is vastly slower and prone to error.",
                        "<strong>Logical operations map perfectly</strong>: AND, OR, NOT, XOR — the entire basis of Boolean logic — map directly to simple transistor circuits. Adding two binary numbers, comparing them, shifting them — all of these become simple gate arrangements. The maths of binary and the physics of transistors are a perfect fit."
                    ]
                },
                {
                    title: "Bits, Bytes, and Practical Binary", //
                    content: "A single binary digit — a 0 or a 1 — is called a <strong>bit</strong>. Bits are grouped into units of 8, called <strong>bytes</strong>, because 8 bits can encode 256 different values (0–255), which is enough to represent a single ASCII character, a pixel colour component, or a small integer. Everything you store in a computer — text, images, video, executable programs — is just bytes. The difference between data types is purely how you interpret those bytes. The same 4 bytes can be a 32-bit integer, a float, a colour value, or four ASCII characters, depending on context. C forces you to be explicit about which interpretation you intend.", //
                    points: [
                        "<strong>1 bit</strong>: Two possible values. Either 0 or 1. The single smallest unit of information.",
                        "<strong>1 byte (8 bits)</strong>: 256 possible values (2^8). The smallest addressable unit of memory — every byte in RAM has a unique address. This is why <code>sizeof(char)</code> is 1: char is defined as one addressable unit.",
                        "<strong>Kilobyte, megabyte, gigabyte</strong>: These follow powers of 2, not powers of 10. 1 KB = 1,024 bytes (2^10). 1 MB = 1,048,576 bytes (2^20). 1 GB = 1,073,741,824 bytes (2^30). Hard drive manufacturers use powers of 10 in advertising, which is why your 1TB drive shows up as 931GB in your OS.",
                        "<strong>Hexadecimal as binary shorthand</strong>: Base 16 uses digits 0–9 and A–F. One hex digit represents exactly 4 binary bits — this is why hex is useful. Writing <code>0xFF</code> is cleaner than <code>0b11111111</code> but carries the same information. You will constantly see hex in C for memory addresses, bit masks, and colour values.",
                        "Try editing the code below — change the numbers, add your own, and observe that C treats decimal, hex, and binary as the same underlying integer value. The notation is for human convenience; the machine only sees bits."
                    ],
                    code: `#include <stdio.h>\n\n// In C, you can write binary, decimal, and hexadecimal literals:\nint main() {\nint decimal = 247;      // Base-10\nint hex = 0xF7;         // Hexadecimal (base 16)\nint binary = 0b11110111; // Binary (base 2)\n\nprintf("They are all exactly the same: %d, %d, %d\\n", decimal, hex, binary);\n// Output: They are all exactly the same: 247, 247, 247\n}`
                }
            ]
        },
        {
            id: "compilers-interpreters", //
            title: "Compilers vs Interpreters", //
            explanation: "Writing C gives you a text file full of human-readable instructions. The CPU you want to run that code on understands none of it. It only understands its own specific instruction set — a binary encoding of primitive operations like 'add two registers' or 'branch if zero'. The entire purpose of a compiler is to bridge that gap: to read your structured, human-readable code and produce the exact sequence of machine instructions that realises your intent on a specific CPU. Understanding what the compiler actually does at each stage is not optional knowledge — it is why certain bugs exist, why certain errors appear on certain lines, and why the same C source code runs identically on completely different hardware.", //
            sections: [
                {
                    title: "What Does a Compiler Do?", //
                    content: "A compiler is a translator that works on the entire document before any of it runs. It reads all of your source code, checks that it is syntactically and semantically valid, then produces a standalone executable. This whole-program view is what allows the compiler to optimise aggressively — it can see that you compute the same value three times in a loop and compute it only once, or that a branch is always true and eliminate the dead code entirely. The resulting binary runs at full hardware speed with no translator present at runtime.", //
                    points: [
                        "<strong>Compile time vs runtime</strong>: Compilation happens once, before the program runs. It is slow (the compiler is doing significant work) but this cost is paid only once. Runtime is fast because the translation is already done — the CPU executes pre-translated machine instructions directly.",
                        "<strong>Early error detection</strong>: The compiler sees your whole program before any of it executes. Type mismatches, undeclared variables, missing semicolons, wrong number of function arguments — all caught before the program touches any real data.",
                        "<strong>Optimisation</strong>: A compiler compiling with <code>-O2</code> will routinely produce code that is 2–5× faster than a naive translation. It understands the target CPU's pipeline, cache behaviour, and register file far better than a human writing by hand.",
                        "<strong>Distribution</strong>: You ship the compiled binary, not your source code. The end user does not need a compiler or any development tools installed."
                    ]
                },
                {
                    title: "What Does an Interpreter Do?", //
                    content: "An interpreter reads and executes your source code one statement at a time, at runtime. It never produces a standalone binary — every time you run the program, the source is re-read and re-executed. This makes iteration fast: write a line, run it immediately, no compilation step. The cost is runtime performance. The interpreter is present during execution, adding overhead on every statement. And because it only ever sees the current statement, not the whole program, it cannot perform the deep cross-statement optimisations a compiler can.", //
                    points: [
                        "<strong>Startup speed</strong>: No compilation phase means programs start immediately. For scripts and interactive tools this is valuable.",
                        "<strong>Runtime errors appear late</strong>: The interpreter only sees a line when execution reaches it. A typo in a rarely-executed error handler might go undetected for months — until the error condition actually triggers.",
                        "<strong>Portability through the interpreter</strong>: The same Python script runs on any machine with a Python interpreter. But the interpreter itself must be installed and maintained.",
                        "<strong>Examples</strong>: Python, Ruby, early JavaScript, Bash. These all read and execute source code at runtime."
                    ]
                },
                {
                    title: "The Battle of Trade-offs", //
                    content: "Neither approach is universally better. The choice depends on what you are optimising for. Systems software, games, databases, embedded firmware, and cryptography choose compiled languages because nanoseconds matter. Web backends, data analysis scripts, and automation tools often choose interpreted or JIT-compiled languages because developer iteration speed matters more than raw execution speed. C is compiled — its entire design philosophy is 'no overhead you did not explicitly request'.", //
                    points: [
                        "<strong>Compiled (C, C++, Rust, Go)</strong>: Maximum performance, minimum runtime overhead, standalone executables. Suitable for operating systems, embedded systems, real-time applications, databases, and any domain where execution speed or memory footprint is a hard constraint.",
                        "<strong>Interpreted (Python, Ruby, Bash)</strong>: Fast development iteration, easy portability through the interpreter, built-in high-level data structures. Suitable for scripting, glue code, data analysis, and applications where developer time is more expensive than CPU time.",
                        "<strong>JIT-compiled (Java, JavaScript V8, PyPy)</strong>: The runtime compiles hot code paths to machine code while the program runs. Attempts to get both fast iteration and fast execution. Often achieves near-compiled performance on long-running code but has high memory usage and unpredictable latency spikes during JIT compilation."
                    ]
                },
                {
                    title: "The C Compilation Process", //
                    content: "C compilation is not a single step — it is a pipeline of four distinct stages. Each stage produces input for the next. Knowing which stage catches which type of error tells you exactly where to look when something goes wrong. Most of the time you invoke all four with a single <code>gcc</code> command, but they are conceptually separate.", //
                    points: [
                        "<strong>1. Preprocessing</strong>: The preprocessor runs before any C code is compiled. It handles lines starting with <code>#</code>. <code>#include &lt;stdio.h&gt;</code> causes it to literally copy the entire contents of that header file into your source. <code>#define PI 3.14159</code> causes it to replace every occurrence of <code>PI</code> in your code with the text <code>3.14159</code>. The output is a single, expanded C file with no <code>#</code> directives remaining.",
                        "<strong>2. Compilation</strong>: The compiler reads the preprocessed C code and converts it to assembly language — human-readable representations of the CPU's instruction set. This is the stage that checks your syntax and types, and where most error messages originate. The output is an assembly file (<code>.s</code>).",
                        "<strong>3. Assembly</strong>: The assembler converts the assembly code to object code — actual binary machine instructions, but not yet a complete program. References to external functions (like <code>printf</code>) are left as unresolved placeholders. The output is an object file (<code>.o</code>).",
                        "<strong>4. Linking</strong>: The linker combines your object file with the pre-compiled library object files that contain the implementations of functions like <code>printf</code>. It resolves all the unresolved references and produces a complete, self-contained executable. This is the stage where 'undefined reference to X' errors appear — you called a function but never provided its implementation."
                    ],
                    code: `// Terminal command to compile (all four stages in one):
gcc myprogram.c -o myprogram

// Run the result:
./myprogram

// You can inspect individual stages:
gcc -E myprogram.c -o myprogram.i    // Stop after preprocessing
gcc -S myprogram.c -o myprogram.s    // Stop after compilation (assembly output)
gcc -c myprogram.c -o myprogram.o    // Stop after assembly (object file)
gcc myprogram.o -o myprogram         // Linking only`
                }
            ]
        },
        {
            id: "history-of-c", //
            title: "A Brief History of C", //
            explanation: "Languages do not appear out of thin air. C was invented to solve a specific, pressing problem that was costing programmers enormous amounts of time. Understanding that context explains why C makes the design choices it does — why it has pointers, why it gives you direct memory access, why it produces fast code, and why it trusts you completely instead of protecting you from yourself.", //
            sections: [
                {
                    title: "Before C: The Era of Assembly", //
                    content: "In the late 1960s, if you wanted to write an operating system or systems software, you wrote it in assembly language — a thin symbolic layer over the raw machine instructions of a specific CPU. Assembly gave you full control and maximum speed, but it had two crippling problems. First, it was extraordinarily tedious — expressing even simple logic required dozens of low-level instructions. Second, and more importantly, assembly code was completely non-portable: code written for a PDP-7 could not run on a PDP-11. If Bell Labs upgraded their hardware, every line of systems software had to be rewritten from scratch. This was not a theoretical concern — it happened routinely, and it consumed enormous engineering resources.", //
                    points: [
                        "<strong>The portability problem</strong>: Every hardware family had its own instruction set, its own register names, its own calling conventions. Writing an operating system meant committing to a single hardware vendor — forever, or until you rewrote everything.",
                        "<strong>The productivity problem</strong>: Complex algorithms that a human would express in two lines of mathematical notation might require 20–50 assembly instructions to implement, with the programmer manually tracking every register and memory location."
                    ]
                },
                {
                    title: "C is Born (1969–1973)", //
                    content: "Dennis Ritchie at Bell Labs developed C between 1969 and 1973, building on an earlier language called B (which was itself derived from BCPL). The design goals were clear: produce a language that was high-level enough to write a complete operating system in, but that compiled to code efficient enough that performance would not be sacrificed relative to hand-written assembly. The result was a language with a small, orthogonal core — a handful of data types, structured control flow, functions, and most crucially, direct memory access through pointers. C gave programmers the ability to think in structured, named abstractions while retaining the ability to manipulate memory at the byte level when needed.", //
                    points: [
                        "<strong>Designed for operating system implementation</strong>: The primary goal was to rewrite Unix in C. This determined the language's priorities: efficiency, direct hardware access, minimal runtime overhead, and predictable memory layout.",
                        "<strong>Pointers as a first-class feature</strong>: The ability to hold and manipulate memory addresses is not incidental to C — it is central. An OS kernel must be able to point to hardware registers, manage memory maps, and pass data structures by reference efficiently. Pointers make all of this natural.",
                        "<strong>Small, composable core</strong>: C has relatively few built-in abstractions. The power comes from combining simple primitives — structs, arrays, functions, pointers — into arbitrarily complex structures. This minimalism is also why C remains portable and compilable on almost any hardware."
                    ]
                },
                {
                    title: "The Unix Revolution", //
                    content: "The killer application for C was rewriting the Unix operating system. Before C, Unix was written in assembly for the PDP-7. When Bell Labs acquired a PDP-11, Ritchie and Thompson rewrote the kernel in C. The result was transformative: not just a faster development process, but a portable operating system — one that could be recompiled for a new hardware target by writing a new C compiler, rather than rewriting the entire OS. Unix spread through universities and research institutions, and C spread with it. When the POSIX standard and commercial Unix variants emerged in the 1980s, C was already the established language of systems programming.", //
                    points: [
                        "<strong>1978: The C Programming Language</strong>: Kernighan and Ritchie published the book that defined the language for a generation. Dense, precise, and still worth reading today.",
                        "<strong>1989: ANSI C (C89)</strong>: The American National Standards Institute standardised the language, ending the era of incompatible compiler dialects. For the first time, 'C' meant one specific, documented language.",
                        "<strong>C99, C11, C17, C23</strong>: Subsequent standards added practical improvements — <code>inline</code>, variable-length arrays, fixed-width integer types, atomic operations, <code>constexpr</code>, and more — while maintaining backward compatibility with code from 1989."
                    ]
                },
                {
                    title: "Why Learn It Today?", //
                    content: "The honest answer is that learning C changes how you think about every other language you use. When you manage memory manually, you understand what a garbage collector is actually doing — and why it sometimes causes latency spikes. When you work with pointers, you understand what object references in Python or Java actually are under the hood. When you write a struct and understand its byte layout, you understand why certain database schemas are faster than others, why network protocol headers look the way they do, and why cache-friendly data structures matter. C is not just a language — it is a mental model for how software actually works at the hardware level.", //
                    points: [
                        "<strong>Everything runs on C</strong>: The Linux kernel, the Windows NT kernel, the macOS kernel (XNU), iOS, Android's Bionic libc, Python's CPython interpreter, the Ruby MRI interpreter, PHP's Zend engine, SQLite, PostgreSQL, Redis, nginx, every major game engine — the foundational layer of essentially all modern software is C.",
                        "<strong>Embedded and real-time systems</strong>: Microcontrollers in cars, medical devices, industrial controllers, aircraft flight management systems — these environments have no room for garbage collectors, virtual machines, or runtime overhead. C is the standard.",
                        "<strong>Performance-critical code</strong>: When a database needs to sort a billion rows, when a game engine needs to simulate physics for a thousand objects at 60fps, when a video codec needs to compress 4K video in real time — that code is C or C++.",
                        "<strong>Understanding, not just using</strong>: Every memory leak you debug in a C program teaches you something about heap allocation that no garbage-collected language ever will. Every segfault teaches you about pointer validity. Every buffer overflow teaches you about bounds checking. These lessons transfer to every other language and make you a significantly better programmer across the board."
                    ]
                }
            ]
        }
    ],

    quiz: [
        {
            question: "What is the primary job of a compiler?",
            options: ["Run your code line by line", "Translate your source code into machine code all at once", "Check your grammar and spelling", "Manage your computer's memory"],
            answer: 1
        },
        {
            question: "Why do computers use binary (base 2) instead of base 10?",
            options: ["Base 10 is too slow for math", "Binary was invented first", "Transistors are physical on/off switches with only two stable states", "It uses less storage space"],
            answer: 2
        },
        {
            question: "How many values can a single byte represent?",
            options: ["8", "16", "128", "256"],
            answer: 3
        },
        {
            question: "Which statement best describes an interpreter?",
            options: ["Translates all code before running it", "Translates and executes code line-by-line at runtime", "Compresses code to make it smaller", "Links library code into your program"],
            answer: 1
        },
        {
            question: "Who created the C programming language?",
            options: ["Linus Torvalds", "Brian Kernighan", "Dennis Ritchie", "Ken Thompson"],
            answer: 2
        },
        {
            question: "What does the C preprocessor do with #include directives?",
            options: ["Imports a module at runtime", "Links a compiled library", "Literally copy-pastes the header file content into your source file", "Downloads the library from the internet"],
            answer: 2
        },
        {
            question: "What is a 'bit'?",
            options: ["8 bytes of data", "A single 0 or 1 value", "A unit of processor speed", "A type of memory address"],
            answer: 1
        },
        {
            question: "What was C's 'killer application' that made it spread globally?",
            options: ["Microsoft Windows", "The original web browser", "Rewriting the Unix operating system in C", "The first video game console"],
            answer: 2
        },
        {
            question: "Which is a key advantage of compiled languages over interpreted ones?",
            options: ["Faster to write", "Errors are only caught at runtime", "Resulting programs run much faster", "No need for a build step"],
            answer: 2
        },
        {
            question: "Where does C sit in the spectrum of programming languages?",
            options: ["It is a high-level language like Python", "It is a low-level language like Assembly", "It is a mid-level language between Assembly and modern high-level languages", "It is a scripting language"],
            answer: 2
        }
    ],

    exam: [
        {
            question: "What are the only two physical states a transistor can reliably represent?",
            options: ["High voltage and low voltage", "On and Off (0 and 1)", "Positive and negative charge", "Signal and noise"],
            answer: 1
        },
        {
            question: "In what year was the C language created?",
            options: ["1965", "1972", "1978", "1983"],
            answer: 1
        },
        {
            question: "What is hexadecimal primarily used for in C programming?",
            options: ["Faster arithmetic calculations", "Storing floating point numbers", "Representing binary patterns and memory addresses compactly", "Encrypting data"],
            answer: 2
        },
        {
            question: "Which of these is a defining property of a compiled language?",
            options: ["Code is translated and run one line at a time", "Errors are only found when that line executes", "All code is translated to machine code before execution begins", "Requires an interpreter installed on the target machine"],
            answer: 2
        },
        {
            question: "1 kilobyte is equal to how many bytes?",
            options: ["1,000", "1,024", "1,048", "2,048"],
            answer: 1
        },
        {
            question: "What is the linking step in C compilation responsible for?",
            options: ["Converting C source code to assembly", "Resolving #include directives", "Stitching your machine code together with external library code to form a complete executable", "Optimizing for processor speed"],
            answer: 2
        },
        {
            question: "Which property of C made Unix the first portable operating system?",
            options: ["C code compiles to the same binary on every machine", "C source code could be recompiled for different hardware architectures", "C has a built-in virtual machine", "C programs run inside an interpreter"],
            answer: 1
        },
        {
            question: "What is 'abstraction' in the context of programming languages?",
            options: ["Making code more complex and verbose", "Hiding low-level hardware details so programmers can express intent at a higher level", "Compressing source code to reduce file size", "Using comments to explain code"],
            answer: 1
        },
        {
            question: "What is the key trade-off of JIT (Just-In-Time) compilation?",
            options: ["Very fast startup but slow peak performance", "It attempts to combine compiled speed with interpreted flexibility, but typically consumes large amounts of RAM", "It produces the smallest possible executables", "It eliminates all runtime errors"],
            answer: 1
        },
        {
            question: "Why is C described as 'unforgiving'?",
            options: ["It has no standard library", "Its syntax is impossible to learn", "It does not protect you from your own mistakes — it assumes you know exactly what you are doing", "It only runs on Unix systems"],
            answer: 2
        },
        {
            question: "What does the preprocessor do before actual C compilation starts?",
            options: ["Optimizes your code for speed", "Processes # directives — e.g., copy-pasting header file contents in place of #include lines", "Converts C code to assembly", "Checks for memory leaks"],
            answer: 1
        },
        {
            question: "The landmark book 'The C Programming Language' by Kernighan and Ritchie was published in which year?",
            options: ["1972", "1975", "1978", "1989"],
            answer: 2
        },
        {
            question: "Which statement about error detection is TRUE?",
            options: ["Compilers catch errors at runtime", "Interpreters catch all errors before execution", "Compiled languages catch most errors at compile time; interpreted languages may only surface errors when the bad line actually runs", "Both compilers and interpreters catch errors identically"],
            answer: 2
        },
        {
            question: "How many bits are in one byte?",
            options: ["4", "8", "16", "32"],
            answer: 1
        }
    ]
};

// BUG FIX: Actually assigning it to the window object so it renders. 
window.ModuleZero = ModuleZero;