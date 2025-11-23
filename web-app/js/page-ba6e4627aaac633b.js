(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    599: function (e, s, t) {
      Promise.resolve().then(t.bind(t, 7340));
    },
    7340: function (e, s, t) {
      "use strict";
      t.r(s),
        t.d(s, {
          default: function () {
            return o;
          },
        });
      var l = t(7437),
        r = t(2265),
        a = t(7648),
        n = t(3464);
      function o() {
        let [e, s] = (0, r.useState)(null),
          [t, o] = (0, r.useState)(null),
          [i, d] = (0, r.useState)(null),
          [c, m] = (0, r.useState)(""),
          [x, u] = (0, r.useState)(!1),
          [g, b] = (0, r.useState)(!1),
          [h, p] = (0, r.useState)(""),
          [y, f] = (0, r.useState)(!1),
          [v, j] = (0, r.useState)(!1),
          [N, w] = (0, r.useState)(!1),
          [D, k] = (0, r.useState)(!1),
          [E, C] = (0, r.useState)(!1),
          [S, z] = (0, r.useState)(!1),
          [A, I] = (0, r.useState)([]),
          [L, U] = (0, r.useState)(new Date()),
          [F, G] = (0, r.useState)(!0);
        (0, r.useEffect)(() => {
          (async () => {
            G(!0);
            try {
              let e = await n.Z.get("/api/game-timings");
              I(e.data);
            } catch (e) {
              console.error("Error fetching game timings:", e);
            }
            let e = localStorage.getItem("userEmail"),
              t = localStorage.getItem("userHouse"),
              l = localStorage.getItem("playerName");
            if (e && t) {
              s(e), o(t), d(l || e.split("@")[0]);
              try {
                (await n.Z.get("/api/games/crossword/sessions")).data.find(
                  (s) => s.playerEmail === e && !0 === s.completed
                ) && j(!0);
              } catch (e) {
                console.error("Error checking crossword status:", e);
              }
              try {
                (await n.Z.get("/api/games/wordle/sessions")).data.find(
                  (s) => s.playerEmail === e && !0 === s.completed
                ) && k(!0);
              } catch (e) {
                console.error("Error checking wordle status:", e);
              }
              try {
                (await n.Z.get("/api/games/typing/sessions")).data.find(
                  (s) => s.playerEmail === e && !0 === s.completed
                ) && C(!0);
              } catch (e) {
                console.error("Error checking typing status:", e);
              }
            } else u(!0);
            G(!1);
          })();
        }, []),
          (0, r.useEffect)(() => {
            let e = setInterval(() => {
              U(new Date());
            }, 1e3);
            return () => clearInterval(e);
          }, []);
        let M = async (e) => {
            e.preventDefault();
            let t = c.trim().toLowerCase();
            if (!t.endsWith("@sadhguru.org")) {
              p("Email must end with @sadhguru.org");
              return;
            }
            f(!0), p("");
            try {
              let e = (
                await n.Z.get("/api/users?email=".concat(encodeURIComponent(t)))
              ).data;
              if (!e.house) {
                p(
                  "Your house information is not available. Please contact the administrator."
                ),
                  f(!1);
                return;
              }
              localStorage.setItem("userEmail", t),
                localStorage.setItem("userHouse", e.house),
                localStorage.setItem("playerName", e.name || t.split("@")[0]),
                s(t),
                o(e.house),
                d(e.name || t.split("@")[0]),
                u(!1),
                b(!1),
                m("");
            } catch (e) {
              var l;
              console.error("Error fetching user data:", e),
                (null === (l = e.response) || void 0 === l
                  ? void 0
                  : l.status) === 404
                  ? (console.log(
                      "Email not found in users sheet, assigning 'Other' house"
                    ),
                    localStorage.setItem("userEmail", t),
                    localStorage.setItem("userHouse", "other"),
                    localStorage.setItem("playerName", t),
                    s(t),
                    o("other"),
                    u(!1),
                    b(!1),
                    m(""))
                  : p("Failed to fetch your details. Please try again.");
            } finally {
              f(!1);
            }
          },
          T = (e) => A.find((s) => s.game === e.toLowerCase()),
          _ = (e) => {
            let s = T(e);
            if (!s) return !0;
            let t = new Date(s.start),
              l = new Date(s.end);
            return L >= t && L <= l;
          },
          P = (e) => {
            let s = T(e);
            return !!s && L < new Date(s.start);
          },
          Z = (e) => {
            let s = T(e);
            return !!s && L > new Date(s.end);
          },
          H = (e) => {
            let s = Math.floor(e / 1e3),
              t = Math.floor(s / 60),
              l = Math.floor(t / 60),
              r = Math.floor(l / 24);
            return r > 0
              ? ""
                  .concat(r, "d ")
                  .concat(l % 24, "h ")
                  .concat(t % 60, "m")
              : l > 0
              ? ""
                  .concat(l, "h ")
                  .concat(t % 60, "m ")
                  .concat(s % 60, "s")
              : t > 0
              ? "".concat(t, "m ").concat(s % 60, "s")
              : "".concat(s, "s");
          },
          B = (e) => {
            let s = T(e);
            return s ? H(new Date(s.start).getTime() - L.getTime()) : "";
          },
          O = (e) => {
            let s = T(e);
            return s ? H(new Date(s.end).getTime() - L.getTime()) : "";
          };
        return (0, l.jsxs)("main", {
          className:
            "min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50",
          children: [
            x &&
              (0, l.jsx)("div", {
                className:
                  "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                children: (0, l.jsxs)("div", {
                  className:
                    "bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full",
                  children: [
                    (0, l.jsxs)("div", {
                      className: "text-center mb-6",
                      children: [
                        (0, l.jsx)("div", {
                          className: "text-5xl mb-4",
                          children: "\uD83D\uDC4B",
                        }),
                        (0, l.jsx)("h2", {
                          className: "text-2xl font-bold text-gray-900 mb-2",
                          children: g ? "Update Your Email" : "Welcome!",
                        }),
                        (0, l.jsx)("p", {
                          className: "text-gray-600",
                          children: g
                            ? "Enter your new email address"
                            : "Enter your email to start playing and save your progress",
                        }),
                      ],
                    }),
                    (0, l.jsxs)("form", {
                      onSubmit: M,
                      className: "space-y-4",
                      children: [
                        (0, l.jsxs)("div", {
                          children: [
                            (0, l.jsx)("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-2",
                              children: "Email Address",
                            }),
                            (0, l.jsx)("input", {
                              type: "email",
                              value: c,
                              onChange: (e) => {
                                m(e.target.value), p("");
                              },
                              className:
                                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ".concat(
                                  h ? "border-red-500" : "border-gray-300"
                                ),
                              placeholder: "yourname@sadhguru.org",
                              required: !0,
                              autoFocus: !0,
                            }),
                            (0, l.jsx)("p", {
                              className: "mt-2 text-xs text-gray-500",
                              children: "Must be a @sadhguru.org email address",
                            }),
                          ],
                        }),
                        h &&
                          (0, l.jsx)("p", {
                            className: "text-sm text-red-600",
                            children: h,
                          }),
                        (0, l.jsx)("button", {
                          type: "submit",
                          disabled: y,
                          className:
                            "w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
                          children: y
                            ? (0, l.jsxs)("span", {
                                className:
                                  "flex items-center justify-center gap-2",
                                children: [
                                  (0, l.jsx)("span", {
                                    className:
                                      "inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white",
                                  }),
                                  "Verifying...",
                                ],
                              })
                            : g
                            ? "Update Email"
                            : "Continue",
                        }),
                        g &&
                          (0, l.jsx)("button", {
                            type: "button",
                            onClick: () => {
                              u(!1), b(!1), m(""), p("");
                            },
                            className:
                              "w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold",
                            children: "Cancel",
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            e &&
              (0, l.jsxs)("div", {
                className:
                  "absolute top-0 left-0 right-0 p-6 flex justify-between items-center",
                children: [
                  (0, l.jsxs)(a.default, {
                    href: "/leaderboard",
                    className:
                      "inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all",
                    children: [
                      (0, l.jsx)("span", {
                        className: "text-xl",
                        children: "\uD83C\uDFC6",
                      }),
                      (0, l.jsx)("span", {
                        className: "text-sm font-semibold text-gray-900",
                        children: "Leaderboard",
                      }),
                    ],
                  }),
                  (0, l.jsxs)("div", {
                    className:
                      "inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md",
                    children: [
                      (0, l.jsx)("span", {
                        className: "text-sm text-gray-600",
                        children: "Playing as:",
                      }),
                      (0, l.jsx)("span", {
                        className: "text-sm font-semibold text-gray-900",
                        children: i,
                      }),
                      (0, l.jsx)("button", {
                        onClick: () => {
                          m(e || ""), p(""), b(!0), u(!0);
                        },
                        className:
                          "text-xs text-blue-600 hover:text-blue-700 underline",
                        children: "Change",
                      }),
                    ],
                  }),
                ],
              }),
            (0, l.jsx)("div", {
              className:
                "flex flex-col items-center justify-center min-h-screen p-24",
              children: (0, l.jsxs)("div", {
                className:
                  "z-10 max-w-6xl w-full items-center justify-center font-mono text-sm",
                children: [
                  (0, l.jsxs)("div", {
                    className: "text-center mb-12",
                    children: [
                      (0, l.jsx)("h1", {
                        className: "text-5xl font-bold text-gray-900 mb-4",
                        children: "\uD83C\uDFAE All Hearts 2025 - Games",
                      }),
                      (0, l.jsx)("p", {
                        className: "text-xl text-gray-600",
                        children:
                          "Choose your favorite game and start playing!",
                      }),
                    ],
                  }),
                  (0, l.jsxs)("div", {
                    className: "relative",
                    children: [
                      F &&
                        (0, l.jsx)("div", {
                          className:
                            "absolute inset-0 flex items-center justify-center z-20 bg-gradient-to-br from-purple-50/80 via-blue-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl",
                          children: (0, l.jsxs)("div", {
                            className: "text-center",
                            children: [
                              (0, l.jsx)("div", {
                                className:
                                  "inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4",
                              }),
                              (0, l.jsx)("p", {
                                className:
                                  "text-lg font-semibold text-gray-900",
                                children: "Loading games...",
                              }),
                              (0, l.jsx)("p", {
                                className: "text-sm text-gray-600 mt-2",
                                children: "Please wait",
                              }),
                            ],
                          }),
                        }),
                      (0, l.jsxs)("div", {
                        className:
                          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12 transition-all ".concat(
                            F ? "blur-md pointer-events-none" : ""
                          ),
                        children: [
                          (0, l.jsxs)(a.default, {
                            href: "/games/crossword",
                            className:
                              "group rounded-xl border px-6 py-8 transition-all relative overflow-hidden ".concat(
                                v
                                  ? "border-green-300 bg-green-50"
                                  : P("crossword")
                                  ? "border-orange-300 bg-orange-50 cursor-not-allowed"
                                  : Z("crossword")
                                  ? "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
                                  : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl hover:scale-105"
                              ),
                            onClick: (e) => {
                              (P("crossword") || Z("crossword")) &&
                                e.preventDefault();
                            },
                            children: [
                              v &&
                                (0, l.jsx)("div", {
                                  className: "absolute top-4 right-4 z-10",
                                  children: (0, l.jsx)("span", {
                                    className: "text-3xl",
                                    children: "✅",
                                  }),
                                }),
                              (0, l.jsxs)("div", {
                                className: P("crossword") ? "blur-md" : "",
                                children: [
                                  (0, l.jsx)("div", {
                                    className: "text-5xl mb-4",
                                    children: "\uD83E\uDDE9",
                                  }),
                                  (0, l.jsxs)("h2", {
                                    className:
                                      "mb-3 text-2xl font-semibold text-gray-900",
                                    children: [
                                      "Crossword",
                                      " ",
                                      !v &&
                                        _("crossword") &&
                                        (0, l.jsx)("span", {
                                          className:
                                            "inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none",
                                          children: "→",
                                        }),
                                    ],
                                  }),
                                  (0, l.jsx)("p", {
                                    className: "m-0 text-sm text-gray-600",
                                    children:
                                      "Solve crossword puzzles and test your vocabulary skills!",
                                  }),
                                ],
                              }),
                              v
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700",
                                    children: "✓ Completed",
                                  })
                                : P("crossword")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2 relative z-10",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700",
                                        children: "\uD83D\uDD12 Locked",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-orange-700",
                                        children: [
                                          "Unlocks in: ",
                                          B("crossword"),
                                        ],
                                      }),
                                    ],
                                  })
                                : Z("crossword")
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600",
                                    children: "⏰ Ended",
                                  })
                                : _("crossword")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                        children: "\uD83D\uDD25 Active",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-blue-700",
                                        children: ["Ends in: ", O("crossword")],
                                      }),
                                    ],
                                  })
                                : (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                    children: "Available",
                                  }),
                            ],
                          }),
                          (0, l.jsxs)(a.default, {
                            href: "/games/wordle",
                            className:
                              "group rounded-xl border px-6 py-8 transition-all relative overflow-hidden ".concat(
                                D
                                  ? "border-green-300 bg-green-50"
                                  : P("wordle")
                                  ? "border-orange-300 bg-orange-50 cursor-not-allowed"
                                  : Z("wordle")
                                  ? "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
                                  : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl hover:scale-105"
                              ),
                            onClick: (e) => {
                              (P("wordle") || Z("wordle")) &&
                                e.preventDefault();
                            },
                            children: [
                              D &&
                                (0, l.jsx)("div", {
                                  className: "absolute top-4 right-4 z-10",
                                  children: (0, l.jsx)("span", {
                                    className: "text-3xl",
                                    children: "✅",
                                  }),
                                }),
                              (0, l.jsxs)("div", {
                                className: P("wordle") ? "blur-md" : "",
                                children: [
                                  (0, l.jsx)("div", {
                                    className: "text-5xl mb-4",
                                    children: "\uD83D\uDCDD",
                                  }),
                                  (0, l.jsxs)("h2", {
                                    className:
                                      "mb-3 text-2xl font-semibold text-gray-900",
                                    children: [
                                      "Wordle Bash",
                                      " ",
                                      !D &&
                                        _("wordle") &&
                                        (0, l.jsx)("span", {
                                          className:
                                            "inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none",
                                          children: "→",
                                        }),
                                    ],
                                  }),
                                  (0, l.jsx)("p", {
                                    className: "m-0 text-sm text-gray-600",
                                    children:
                                      "Guess the word in 6 tries or less!",
                                  }),
                                ],
                              }),
                              D
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700",
                                    children: "✓ Completed",
                                  })
                                : P("wordle")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2 relative z-10",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700",
                                        children: "\uD83D\uDD12 Locked",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-orange-700",
                                        children: ["Unlocks in: ", B("wordle")],
                                      }),
                                    ],
                                  })
                                : Z("wordle")
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600",
                                    children: "⏰ Ended",
                                  })
                                : _("wordle")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                        children: "\uD83D\uDD25 Active",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-blue-700",
                                        children: ["Ends in: ", O("wordle")],
                                      }),
                                    ],
                                  })
                                : (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                    children: "Available",
                                  }),
                            ],
                          }),
                          (0, l.jsxs)(a.default, {
                            href: "/games/typing",
                            className:
                              "group rounded-xl border px-6 py-8 transition-all relative overflow-hidden ".concat(
                                E
                                  ? "border-green-300 bg-green-50"
                                  : P("typing")
                                  ? "border-orange-300 bg-orange-50 cursor-not-allowed"
                                  : Z("typing")
                                  ? "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
                                  : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl hover:scale-105"
                              ),
                            onClick: (e) => {
                              (P("typing") || Z("typing")) &&
                                e.preventDefault();
                            },
                            children: [
                              E &&
                                (0, l.jsx)("div", {
                                  className: "absolute top-4 right-4 z-10",
                                  children: (0, l.jsx)("span", {
                                    className: "text-3xl",
                                    children: "✅",
                                  }),
                                }),
                              (0, l.jsxs)("div", {
                                className: P("typing") ? "blur-md" : "",
                                children: [
                                  (0, l.jsx)("div", {
                                    className: "text-5xl mb-4",
                                    children: "⌨️",
                                  }),
                                  (0, l.jsxs)("h2", {
                                    className:
                                      "mb-3 text-2xl font-semibold text-gray-900",
                                    children: [
                                      "Typing Competition",
                                      " ",
                                      !E &&
                                        _("typing") &&
                                        (0, l.jsx)("span", {
                                          className:
                                            "inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none",
                                          children: "→",
                                        }),
                                    ],
                                  }),
                                  (0, l.jsx)("p", {
                                    className: "m-0 text-sm text-gray-600",
                                    children:
                                      "Test your typing speed and accuracy!",
                                  }),
                                ],
                              }),
                              E
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700",
                                    children: "✓ Completed",
                                  })
                                : P("typing")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2 relative z-10",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700",
                                        children: "\uD83D\uDD12 Locked",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-orange-700",
                                        children: ["Unlocks in: ", B("typing")],
                                      }),
                                    ],
                                  })
                                : Z("typing")
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600",
                                    children: "⏰ Ended",
                                  })
                                : _("typing")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                        children: "\uD83D\uDD25 Active",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-blue-700",
                                        children: ["Ends in: ", O("typing")],
                                      }),
                                    ],
                                  })
                                : (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                    children: "Available",
                                  }),
                            ],
                          }),
                          (0, l.jsxs)(a.default, {
                            href: "/games/sudoku",
                            className:
                              "group rounded-xl border px-6 py-8 transition-all relative overflow-hidden ".concat(
                                N
                                  ? "border-green-300 bg-green-50"
                                  : P("sudoku")
                                  ? "border-orange-300 bg-orange-50 cursor-not-allowed"
                                  : Z("sudoku")
                                  ? "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
                                  : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl hover:scale-105"
                              ),
                            onClick: (e) => {
                              (P("sudoku") || Z("sudoku")) &&
                                e.preventDefault();
                            },
                            children: [
                              N &&
                                (0, l.jsx)("div", {
                                  className: "absolute top-4 right-4 z-10",
                                  children: (0, l.jsx)("span", {
                                    className: "text-3xl",
                                    children: "✅",
                                  }),
                                }),
                              (0, l.jsxs)("div", {
                                className: P("sudoku") ? "blur-md" : "",
                                children: [
                                  (0, l.jsx)("div", {
                                    className: "text-5xl mb-4",
                                    children: "\uD83D\uDD22",
                                  }),
                                  (0, l.jsxs)("h2", {
                                    className:
                                      "mb-3 text-2xl font-semibold text-gray-900",
                                    children: [
                                      "God is watching you...",
                                      " ",
                                      !N &&
                                        _("sudoku") &&
                                        (0, l.jsx)("span", {
                                          className:
                                            "inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none",
                                          children: "→",
                                        }),
                                    ],
                                  }),
                                  (0, l.jsxs)("p", {
                                    className: "m-0 text-sm text-gray-600",
                                    children: ["God is watching you...", " "],
                                  }),
                                ],
                              }),
                              N
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700",
                                    children: "✓ Completed",
                                  })
                                : P("sudoku")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2 relative z-10",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700",
                                        children: "\uD83D\uDD12 Locked",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-orange-700",
                                        children: ["Unlocks in: ", B("sudoku")],
                                      }),
                                    ],
                                  })
                                : Z("sudoku")
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600",
                                    children: "⏰ Ended",
                                  })
                                : _("sudoku")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                        children: "\uD83D\uDD25 Active",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-blue-700",
                                        children: ["Ends in: ", O("sudoku")],
                                      }),
                                    ],
                                  })
                                : (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                    children: "Available",
                                  }),
                            ],
                          }),
                          (0, l.jsxs)(a.default, {
                            href: "/games/memory",
                            className:
                              "group rounded-xl border px-6 py-8 transition-all relative overflow-hidden ".concat(
                                S
                                  ? "border-green-300 bg-green-50"
                                  : P("memory")
                                  ? "border-orange-300 bg-orange-50 cursor-not-allowed"
                                  : Z("memory")
                                  ? "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
                                  : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl hover:scale-105"
                              ),
                            onClick: (e) => {
                              (P("memory") || Z("memory")) &&
                                e.preventDefault();
                            },
                            children: [
                              S &&
                                (0, l.jsx)("div", {
                                  className: "absolute top-4 right-4 z-10",
                                  children: (0, l.jsx)("span", {
                                    className: "text-3xl",
                                    children: "✅",
                                  }),
                                }),
                              (0, l.jsxs)("div", {
                                className: P("memory") ? "blur-md" : "",
                                children: [
                                  (0, l.jsx)("div", {
                                    className: "text-5xl mb-4",
                                    children: "\uD83C\uDFAF",
                                  }),
                                  (0, l.jsxs)("h2", {
                                    className:
                                      "mb-3 text-2xl font-semibold text-gray-900",
                                    children: [
                                      "God is watching you...",
                                      " ",
                                      !S &&
                                        _("memory") &&
                                        (0, l.jsx)("span", {
                                          className:
                                            "inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none",
                                          children: "→",
                                        }),
                                    ],
                                  }),
                                  (0, l.jsxs)("p", {
                                    className: "m-0 text-sm text-gray-600",
                                    children: ["God is watching you...", " "],
                                  }),
                                ],
                              }),
                              S
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700",
                                    children: "✓ Completed",
                                  })
                                : P("memory")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2 relative z-10",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700",
                                        children: "\uD83D\uDD12 Locked",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-orange-700",
                                        children: ["Unlocks in: ", B("memory")],
                                      }),
                                    ],
                                  })
                                : Z("memory")
                                ? (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600",
                                    children: "⏰ Ended",
                                  })
                                : _("memory")
                                ? (0, l.jsxs)("div", {
                                    className: "mt-4 space-y-2",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                        children: "\uD83D\uDD25 Active",
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "text-sm font-medium text-blue-700",
                                        children: ["Ends in: ", O("memory")],
                                      }),
                                    ],
                                  })
                                : (0, l.jsx)("div", {
                                    className:
                                      "mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700",
                                    children: "Available",
                                  }),
                            ],
                          }),
                          (0, l.jsxs)("div", {
                            className:
                              "rounded-xl border border-gray-200 bg-gray-50 px-6 py-8 opacity-60",
                            children: [
                              (0, l.jsx)("div", {
                                className: "text-5xl mb-4",
                                children: "\uD83C\uDFB2",
                              }),
                              (0, l.jsx)("h2", {
                                className:
                                  "mb-3 text-2xl font-semibold text-gray-700",
                                children: "More Games",
                              }),
                              (0, l.jsx)("p", {
                                className: "m-0 text-sm text-gray-600",
                                children:
                                  "Many more exciting games coming soon!",
                              }),
                              (0, l.jsx)("div", {
                                className:
                                  "mt-4 inline-block px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full",
                                children: "Coming Soon",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
  },
  function (e) {
    e.O(0, [648, 464, 971, 117, 744], function () {
      return e((e.s = 599));
    }),
      (_N_E = e.O());
  },
]);
