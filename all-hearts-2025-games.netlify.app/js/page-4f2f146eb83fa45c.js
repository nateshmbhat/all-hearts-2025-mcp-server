(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [0],
  {
    5007: function (e, t, s) {
      Promise.resolve().then(s.bind(s, 119));
    },
    119: function (e, t, s) {
      "use strict";
      s.r(t),
        s.d(t, {
          default: function () {
            return h;
          },
        });
      var a = s(7437),
        l = s(2265),
        r = s(7648),
        n = s(9376),
        o = s(3145),
        i = s(3464),
        d = s(8443);
      let c = (e) => "/images/memory/".concat(e + 1, ".png"),
        u = (e) => {
          let t = [...e];
          for (let e = t.length - 1; e > 0; e--) {
            let s = Math.floor(Math.random() * (e + 1));
            [t[e], t[s]] = [t[s], t[e]];
          }
          return t;
        },
        m = () => {
          let e = [];
          for (let t = 0; t < 18; t++)
            e.push(
              { id: 2 * t, imageId: t, isFlipped: !1, isMatched: !1 },
              { id: 2 * t + 1, imageId: t, isFlipped: !1, isMatched: !1 }
            );
          return u(e);
        };
      function x(e) {
        let { playerEmail: t, playerHouse: s, playerName: n } = e,
          [o, u] = (0, l.useState)(() => ({
            tiles: m(),
            selectedTiles: [],
            currentRound: 1,
            totalMatchesFound: 0,
            roundMatchesFound: 0,
            roundsWon: 0,
            gameStatus: "playing",
          })),
          [x, g] = (0, l.useState)(""),
          [h, p] = (0, l.useState)(null),
          [b, f] = (0, l.useState)(0),
          [y, j] = (0, l.useState)(!1),
          [N, w] = (0, l.useState)(!0),
          [v, S] = (0, l.useState)(!1),
          [k, M] = (0, l.useState)(!1),
          [C, D] = (0, l.useState)(new Set()),
          [F, T] = (0, l.useState)(!1),
          [E, I] = (0, l.useState)(!1),
          [R, P] = (0, l.useState)(!1);
        (0, l.useEffect)(() => {
          let e = !1,
            t = [];
          for (let s = 0; s < 18; s++) {
            let a = new Image();
            t.push(a),
              (a.onerror = () => {
                e ||
                  D((e) => {
                    if (e.has(s)) return e;
                    let t = new Set(e);
                    return t.add(s), t;
                  });
              }),
              (a.src = c(s));
          }
          return () => {
            (e = !0),
              t.forEach((e) => {
                (e.onload = null), (e.onerror = null);
              });
          };
        }, [D]),
          (0, l.useEffect)(() => {
            (async () => {
              if (t && s) {
                j(!1);
                try {
                  let e = (0, d.g0)(),
                    a =
                      (
                        await i.Z.post(
                          "/api/games/memory/sessions",
                          {
                            playerEmail: t,
                            house: s,
                            playerName: n,
                            gameType: "memory",
                          },
                          { headers: { "Content-Type": "text/plain", ...e } }
                        )
                      ).data.id || "session-".concat(Date.now());
                  g(a),
                    p(null),
                    u({
                      tiles: m(),
                      selectedTiles: [],
                      currentRound: 1,
                      totalMatchesFound: 0,
                      roundMatchesFound: 0,
                      roundsWon: 0,
                      gameStatus: "playing",
                    }),
                    f(0),
                    D(new Set());
                } catch (e) {
                  console.error("Unable to create Memory session", e),
                    g("local-".concat(Date.now())),
                    p(null),
                    u({
                      tiles: m(),
                      selectedTiles: [],
                      currentRound: 1,
                      totalMatchesFound: 0,
                      roundMatchesFound: 0,
                      roundsWon: 0,
                      gameStatus: "playing",
                    }),
                    f(0),
                    D(new Set());
                } finally {
                  j(!0);
                }
              }
            })();
          }, [t, s, n]),
          (0, l.useEffect)(() => {
            if ("playing" !== o.gameStatus || N || F || E) return;
            let e = setInterval(() => {
              f((e) => {
                let t = e + 1;
                return t >= 600
                  ? (u((e) => ({ ...e, gameStatus: "lost" })), 600)
                  : t;
              });
            }, 1e3);
            return () => clearInterval(e);
          }, [o.gameStatus, N, F, E]);
        let W = (0, l.useCallback)(
          (e) => {
            k ||
              "playing" !== o.gameStatus ||
              N ||
              o.tiles[e].isFlipped ||
              o.tiles[e].isMatched ||
              o.selectedTiles.length >= 2 ||
              o.selectedTiles.includes(e) ||
              u((t) => ({
                ...t,
                tiles: t.tiles.map((t, s) =>
                  s === e ? { ...t, isFlipped: !0 } : t
                ),
                selectedTiles: [...t.selectedTiles, e],
              }));
          },
          [o, k, N]
        );
        (0, l.useEffect)(() => {
          if (
            2 === o.selectedTiles.length &&
            "playing" === o.gameStatus &&
            !k
          ) {
            M(!0);
            let [e, t] = o.selectedTiles,
              s = o.tiles[e],
              a = o.tiles[t];
            setTimeout(() => {
              s.imageId === a.imageId
                ? u((s) => {
                    let a = s.tiles.map((s, a) =>
                        a === e || a === t
                          ? { ...s, isMatched: !0, isFlipped: !0 }
                          : s
                      ),
                      l = s.roundMatchesFound + 1,
                      r = s.totalMatchesFound + 1;
                    if (18 === l) {
                      let e = s.roundsWon + 1;
                      return (
                        setTimeout(() => {
                          T(!0), M(!1);
                        }, 500),
                        {
                          ...s,
                          tiles: a,
                          selectedTiles: [],
                          roundMatchesFound: l,
                          totalMatchesFound: r,
                          roundsWon: e,
                        }
                      );
                    }
                    return (
                      M(!1),
                      {
                        ...s,
                        tiles: a,
                        selectedTiles: [],
                        roundMatchesFound: l,
                        totalMatchesFound: r,
                      }
                    );
                  })
                : (u((s) => {
                    let a = s.tiles.map((s, a) =>
                      a === e || a === t ? { ...s, isFlipped: !1 } : s
                    );
                    return { ...s, tiles: a, selectedTiles: [] };
                  }),
                  M(!1));
            }, 2e3);
          }
        }, [o.selectedTiles, o.tiles, o.gameStatus, k]);
        let O = (0, l.useCallback)(
          (e, t) => Math.min(100, Math.round(((18 * e + t) / 90) * 100)),
          []
        );
        (0, l.useEffect)(() => {
          ("won" === o.gameStatus || "lost" === o.gameStatus) &&
            x &&
            h &&
            (async () => {
              S(!0);
              try {
                let e = new Date().toISOString();
                new Date(e).getTime(), new Date(h).getTime();
                let a = O(o.roundsWon, o.roundMatchesFound),
                  l = {
                    id: x,
                    playerEmail: t,
                    house: s,
                    name: n,
                    startTime: h,
                    endTime: e,
                    triesUsed: o.currentRound,
                    matchesFound: o.roundsWon,
                    score: a,
                    completed: !0,
                  },
                  r = (0, d.g0)();
                await i.Z.patch("/api/games/memory/sessions", l, {
                  headers: { "Content-Type": "text/plain", ...r },
                });
              } catch (e) {
                console.error("Unable to save Memory session", e),
                  409 === e.response.status && I(!0);
              } finally {
                S(!1);
              }
            })();
        }, [
          o.gameStatus,
          x,
          h,
          t,
          s,
          n,
          o.currentRound,
          o.roundsWon,
          o.roundMatchesFound,
        ]);
        let _ = (0, l.useCallback)(() => {
            N && (w(!1), h || p(new Date().toISOString()));
          }, [h, N]),
          z = (0, l.useCallback)(() => {
            T(!1);
            let e = m();
            D(new Set()),
              u((t) => ({
                ...t,
                tiles: e,
                selectedTiles: [],
                currentRound: t.currentRound + 1,
                roundMatchesFound: 0,
              }));
          }, []),
          G = (0, l.useCallback)(() => {
            T(!1), u((e) => ({ ...e, gameStatus: "won" }));
          }, []),
          A = (0, l.useCallback)(() => {
            if (!R || "playing" !== o.gameStatus || k) return;
            let e = new Set();
            if (
              (o.tiles.forEach((t) => {
                t.isMatched || e.add(t.imageId);
              }),
              0 === e.size)
            )
              return;
            let t = Array.from(e)[0],
              s = [];
            o.tiles.forEach((e, a) => {
              e.imageId !== t || e.isMatched || s.push(a);
            }),
              s.length >= 2 &&
                u((e) => ({
                  ...e,
                  tiles: e.tiles.map((e, t) =>
                    s.includes(t) ? { ...e, isFlipped: !0 } : e
                  ),
                  selectedTiles: s.slice(0, 2),
                }));
          }, [R, o, k]),
          Y = (0, l.useCallback)(() => {
            R &&
              "playing" === o.gameStatus &&
              !k &&
              u((e) => {
                let t = e.tiles.map((e) => ({
                    ...e,
                    isMatched: !0,
                    isFlipped: !0,
                  })),
                  s = e.totalMatchesFound + 18,
                  a = e.roundsWon + 1;
                return (
                  setTimeout(() => {
                    T(!0);
                  }, 100),
                  {
                    ...e,
                    tiles: t,
                    selectedTiles: [],
                    roundMatchesFound: 18,
                    totalMatchesFound: s,
                    roundsWon: a,
                  }
                );
              });
          }, [R, o.gameStatus, k]),
          B = (0, l.useCallback)(() => {
            "playing" !== o.gameStatus ||
              k ||
              u((e) => ({ ...e, gameStatus: "won" }));
          }, [o.gameStatus, k]),
          H = (e) => {
            let t = Math.floor(e / 60)
                .toString()
                .padStart(2, "0"),
              s = (e % 60).toString().padStart(2, "0");
            return "".concat(t, ":").concat(s);
          };
        if (!x || !y)
          return (0, a.jsx)("div", {
            className:
              "min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-6",
            children: (0, a.jsxs)("div", {
              className:
                "bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full",
              children: [
                (0, a.jsx)("div", {
                  className:
                    "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4",
                }),
                (0, a.jsx)("p", {
                  className: "text-lg font-semibold text-gray-900",
                  children: "Preparing your memory challenge...",
                }),
              ],
            }),
          });
        if ("won" === o.gameStatus || "lost" === o.gameStatus) {
          let e = O(o.roundsWon, o.roundMatchesFound);
          return (0, a.jsxs)("div", {
            className:
              "min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4",
            children: [
              v &&
                (0, a.jsx)("div", {
                  className:
                    "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",
                  children: (0, a.jsxs)("div", {
                    className:
                      "bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full",
                    children: [
                      (0, a.jsx)("div", {
                        className:
                          "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-gray-700 font-semibold",
                        children: "Saving your score...",
                      }),
                    ],
                  }),
                }),
              (0, a.jsxs)("div", {
                className:
                  "bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full space-y-6",
                children: [
                  (0, a.jsxs)("div", {
                    className: "text-center space-y-2",
                    children: [
                      (0, a.jsx)("div", {
                        className: "text-6xl",
                        children:
                          "won" === o.gameStatus ? "\uD83C\uDF89" : "⏰",
                      }),
                      (0, a.jsx)("h2", {
                        className: "text-3xl font-bold text-gray-900",
                        children:
                          "won" === o.gameStatus
                            ? "Congratulations!"
                            : "Time's Up!",
                      }),
                      (0, a.jsxs)("p", {
                        className: "text-gray-600",
                        children: [
                          "You won ",
                          o.roundsWon,
                          " ",
                          1 === o.roundsWon ? "round" : "rounds",
                          "!",
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "bg-gray-50 rounded-xl p-4 text-center",
                        children: [
                          (0, a.jsx)("p", {
                            className:
                              "text-xs uppercase text-gray-500 tracking-wide",
                            children: "Score",
                          }),
                          (0, a.jsx)("p", {
                            className: "text-3xl font-bold text-blue-600",
                            children: e,
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "bg-gray-50 rounded-xl p-4 text-center",
                        children: [
                          (0, a.jsx)("p", {
                            className:
                              "text-xs uppercase text-gray-500 tracking-wide",
                            children: "Rounds Won",
                          }),
                          (0, a.jsx)("p", {
                            className: "text-3xl font-bold text-emerald-600",
                            children: o.roundsWon,
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "bg-gray-50 rounded-xl p-4 text-center",
                        children: [
                          (0, a.jsx)("p", {
                            className:
                              "text-xs uppercase text-gray-500 tracking-wide",
                            children: "Time",
                          }),
                          (0, a.jsx)("p", {
                            className:
                              "text-3xl font-mono font-bold text-gray-900",
                            children: H(b),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "bg-gray-50 rounded-xl p-4",
                    children: (0, a.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, a.jsx)("p", {
                          className: "text-sm text-gray-600",
                          children: "Total Rounds Played",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-lg font-semibold text-gray-900",
                          children: o.currentRound,
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex flex-col sm:flex-row gap-3",
                    children: [
                      (0, a.jsx)(r.default, {
                        href: "/leaderboard",
                        className:
                          "flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-center",
                        children: "\uD83C\uDFC6 View Leaderboard",
                      }),
                      (0, a.jsx)(r.default, {
                        href: "/",
                        className:
                          "flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center",
                        children: "← Back to Games",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        }
        return (0, a.jsxs)("div", {
          className:
            "min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-10 px-4",
          children: [
            N &&
              (0, a.jsx)("div", {
                className:
                  "fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 px-4",
                children: (0, a.jsxs)("div", {
                  className:
                    "bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full space-y-6",
                  children: [
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsx)("h2", {
                          className: "text-3xl font-bold text-gray-900 mb-2",
                          children: "How To Play",
                        }),
                        (0, a.jsxs)("p", {
                          className: "text-gray-600",
                          children: [
                            "Win as many rounds as possible! You have",
                            " ",
                            Math.floor(10),
                            " minutes.",
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsxs)("ul", {
                      className: "space-y-2 text-gray-600 text-sm",
                      children: [
                        (0, a.jsx)("li", {
                          children:
                            "• Click on tiles to flip them and reveal images",
                        }),
                        (0, a.jsx)("li", {
                          children:
                            "• Match two tiles with the same image to keep them flipped",
                        }),
                        (0, a.jsx)("li", {
                          children:
                            "• If tiles don't match, they'll flip back (no shuffling within a round)",
                        }),
                        (0, a.jsxs)("li", {
                          children: [
                            "• Match all ",
                            18,
                            " pairs in a round to win that round!",
                          ],
                        }),
                        (0, a.jsx)("li", {
                          children:
                            "• After winning a round, choose to continue or submit your score",
                        }),
                        (0, a.jsxs)("li", {
                          children: [
                            "• Win as many rounds as possible within",
                            " ",
                            Math.floor(10),
                            " minutes!",
                          ],
                        }),
                        (0, a.jsx)("li", {
                          children:
                            "• You can also end a round early and submit your score at any time",
                        }),
                      ],
                    }),
                    (0, a.jsx)("button", {
                      type: "button",
                      onClick: _,
                      className:
                        "w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition",
                      children: "Start Playing",
                    }),
                  ],
                }),
              }),
            F &&
              (0, a.jsx)("div", {
                className:
                  "fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 px-4",
                children: (0, a.jsxs)("div", {
                  className:
                    "bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "text-center",
                      children: [
                        (0, a.jsx)("div", {
                          className: "text-6xl mb-4",
                          children: "\uD83C\uDF89",
                        }),
                        (0, a.jsxs)("h2", {
                          className: "text-3xl font-bold text-gray-900 mb-2",
                          children: ["Round ", o.currentRound, " Complete!"],
                        }),
                        (0, a.jsxs)("p", {
                          className: "text-gray-600",
                          children: ["You found all ", 18, " pairs!"],
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 space-y-3",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, a.jsx)("span", {
                              className: "text-gray-600",
                              children: "Rounds Won:",
                            }),
                            (0, a.jsx)("span", {
                              className: "text-2xl font-bold text-emerald-600",
                              children: o.roundsWon,
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, a.jsx)("span", {
                              className: "text-gray-600",
                              children: "Time Remaining:",
                            }),
                            (0, a.jsx)("span", {
                              className:
                                "text-2xl font-mono font-bold text-blue-600",
                              children: H(Math.max(0, 600 - b)),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "space-y-3",
                      children: [
                        (0, a.jsxs)("button", {
                          type: "button",
                          onClick: z,
                          className:
                            "w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-lg",
                          children: [
                            "Continue to Round ",
                            o.currentRound + 1,
                            " →",
                          ],
                        }),
                        (0, a.jsx)("button", {
                          type: "button",
                          onClick: G,
                          className:
                            "w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition",
                          children: "Submit Score & End Game",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            E &&
              (0, a.jsx)("div", {
                className:
                  "fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 px-4",
                children: (0, a.jsxs)("div", {
                  className:
                    "bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "text-center",
                      children: [
                        (0, a.jsx)("div", {
                          className: "text-6xl mb-4",
                          children: "✅",
                        }),
                        (0, a.jsx)("h2", {
                          className: "text-3xl font-bold text-gray-900 mb-2",
                          children: "Already Played",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-gray-600",
                          children:
                            "You have already played this game. Each player can only submit one score.",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className: "space-y-3",
                      children: [
                        (0, a.jsx)(r.default, {
                          href: "/",
                          className:
                            "block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center",
                          children: "Back to Games",
                        }),
                        (0, a.jsx)("button", {
                          type: "button",
                          onClick: () => I(!1),
                          className:
                            "w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition",
                          children: "Close",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            (0, a.jsxs)("div", {
              className: "max-w-4xl mx-auto",
              children: [
                (0, a.jsxs)("div", {
                  className:
                    "bg-white rounded-2xl shadow-xl p-6 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                  children: [
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsx)("h1", {
                          className: "text-2xl font-bold text-gray-900",
                          children: "Memory Game",
                        }),
                        (0, a.jsxs)("p", {
                          className: "text-sm text-gray-500",
                          children: ["Player: ", n],
                        }),
                        R &&
                          (0, a.jsx)("p", {
                            className:
                              "text-xs text-orange-600 font-semibold mt-1",
                            children:
                              "\uD83D\uDC1B DEBUG MODE ON - Press 'D' to toggle",
                          }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "flex flex-wrap items-center gap-3 md:justify-end",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "text-center min-w-[90px]",
                          children: [
                            (0, a.jsx)("p", {
                              className:
                                "text-xs text-gray-500 uppercase tracking-wide",
                              children: "Time Left",
                            }),
                            (0, a.jsx)("p", {
                              className:
                                "text-2xl font-mono font-semibold ".concat(
                                  600 - b < 60
                                    ? "text-red-600"
                                    : "text-blue-600"
                                ),
                              children: H(Math.max(0, 600 - b)),
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className: "text-center min-w-[90px]",
                          children: [
                            (0, a.jsx)("p", {
                              className:
                                "text-xs text-gray-500 uppercase tracking-wide",
                              children: "Rounds Won",
                            }),
                            (0, a.jsx)("p", {
                              className:
                                "text-2xl font-semibold text-emerald-600",
                              children: o.roundsWon || 0,
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className: "text-center min-w-[90px]",
                          children: [
                            (0, a.jsx)("p", {
                              className:
                                "text-xs text-gray-500 uppercase tracking-wide",
                              children: "Round",
                            }),
                            (0, a.jsx)("p", {
                              className: "text-2xl font-semibold text-gray-900",
                              children: o.currentRound,
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className: "text-center min-w-[90px]",
                          children: [
                            (0, a.jsx)("p", {
                              className:
                                "text-xs text-gray-500 uppercase tracking-wide",
                              children: "Round Matches",
                            }),
                            (0, a.jsx)("p", {
                              className: "text-2xl font-semibold text-blue-600",
                              children: o.roundMatchesFound,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                R &&
                  (0, a.jsx)("div", {
                    className:
                      "bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-4",
                    children: (0, a.jsxs)("div", {
                      className:
                        "flex flex-wrap gap-2 items-center justify-center",
                      children: [
                        (0, a.jsx)("button", {
                          type: "button",
                          onClick: A,
                          disabled: k || "playing" !== o.gameStatus,
                          className:
                            "px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition font-semibold text-sm disabled:opacity-50",
                          children: "\uD83C\uDFAF Auto-Match Next Pair",
                        }),
                        (0, a.jsx)("button", {
                          type: "button",
                          onClick: Y,
                          disabled: k || "playing" !== o.gameStatus,
                          className:
                            "px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition font-semibold text-sm disabled:opacity-50",
                          children: "⚡ Auto-Complete Round",
                        }),
                        (0, a.jsx)("span", {
                          className: "text-xs text-gray-600 px-2",
                          children: "Press 'D' to toggle debug mode",
                        }),
                      ],
                    }),
                  }),
                (0, a.jsx)("div", {
                  className: "bg-white rounded-2xl shadow-xl p-6 mb-6",
                  children: (0, a.jsx)("div", {
                    className: "grid gap-2",
                    style: {
                      gridTemplateColumns: "repeat(".concat(6, ", 1fr)"),
                    },
                    children: o.tiles.map((e, t) =>
                      (0, a.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => W(t),
                          disabled:
                            k ||
                            e.isFlipped ||
                            e.isMatched ||
                            o.selectedTiles.length >= 2 ||
                            N,
                          className:
                            "\n                    aspect-square rounded-lg border-2 transition-all duration-300\n                    "
                              .concat(
                                e.isMatched
                                  ? "bg-green-100 border-green-500 opacity-75"
                                  : e.isFlipped
                                  ? "bg-blue-100 border-blue-500"
                                  : R
                                  ? "bg-gray-200 ".concat(
                                      (() => {
                                        if (!R || e.isMatched) return "";
                                        let t = [
                                          "border-red-400",
                                          "border-orange-400",
                                          "border-yellow-400",
                                          "border-green-400",
                                          "border-blue-400",
                                          "border-indigo-400",
                                          "border-purple-400",
                                          "border-pink-400",
                                          "border-cyan-400",
                                          "border-lime-400",
                                          "border-amber-400",
                                          "border-emerald-400",
                                          "border-teal-400",
                                          "border-violet-400",
                                          "border-fuchsia-400",
                                          "border-rose-400",
                                          "border-sky-400",
                                          "border-stone-400",
                                        ];
                                        return t[e.imageId % t.length];
                                      })(),
                                      " hover:border-blue-400 hover:bg-gray-100"
                                    )
                                  : "bg-gray-200 border-gray-300 hover:border-blue-400 hover:bg-gray-100",
                                "\n                    "
                              )
                              .concat(
                                e.isFlipped || e.isMatched
                                  ? ""
                                  : "hover:scale-105",
                                "\n                    "
                              )
                              .concat(
                                k || N
                                  ? "cursor-not-allowed opacity-50"
                                  : "cursor-pointer",
                                "\n                  "
                              ),
                          children:
                            e.isFlipped || e.isMatched
                              ? (0, a.jsxs)("div", {
                                  className:
                                    "w-full h-full flex items-center justify-center relative",
                                  children: [
                                    R &&
                                      (0, a.jsx)("div", {
                                        className:
                                          "absolute top-1 left-1 bg-yellow-400 text-black text-xs font-bold px-1 rounded z-10",
                                        children: e.imageId + 1,
                                      }),
                                    C.has(e.imageId)
                                      ? (0, a.jsx)("div", {
                                          className:
                                            "w-full h-full flex items-center justify-center text-2xl text-gray-600",
                                          children: e.imageId + 1,
                                        })
                                      : (0, a.jsx)("img", {
                                          src: c(e.imageId),
                                          className:
                                            "w-full h-full object-contain",
                                          onError: () => {
                                            D((t) => new Set(t).add(e.imageId));
                                          },
                                        }),
                                  ],
                                })
                              : (0, a.jsxs)("div", {
                                  className:
                                    "w-full h-full flex items-center justify-center relative",
                                  children: [
                                    R &&
                                      (0, a.jsx)("div", {
                                        className:
                                          "absolute top-1 left-1 bg-yellow-400 text-black text-xs font-bold px-1 rounded z-10",
                                        children: e.imageId + 1,
                                      }),
                                    (0, a.jsx)("span", {
                                      className: "text-3xl",
                                      children: "?",
                                    }),
                                  ],
                                }),
                        },
                        e.id
                      )
                    ),
                  }),
                }),
                (0, a.jsxs)("div", {
                  className:
                    "flex flex-col sm:flex-row gap-4 justify-center items-center",
                  children: [
                    "playing" === o.gameStatus &&
                      (0, a.jsx)("button", {
                        type: "button",
                        onClick: B,
                        disabled: k || N,
                        className:
                          "px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
                        children: "End Round & Submit Scores",
                      }),
                    (0, a.jsx)(r.default, {
                      href: "/",
                      className:
                        "inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold",
                      children: "← Back to Games",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      var g = s(8761);
      function h() {
        let [e, t] = (0, l.useState)(""),
          [s, d] = (0, l.useState)(""),
          [c, u] = (0, l.useState)(""),
          [m, h] = (0, l.useState)(!0),
          [p, b] = (0, l.useState)(!1),
          [f, y] = (0, l.useState)(!0),
          [j, N] = (0, l.useState)(null),
          w = (0, n.useRouter)();
        if (
          ((0, l.useEffect)(() => {
            (async () => {
              let e = localStorage.getItem("userEmail"),
                s = localStorage.getItem("userHouse"),
                a = localStorage.getItem("playerName");
              if (e && s) {
                t(e), d(s), u(a || e.split("@")[0]);
                try {
                  let e = (await i.Z.get("/api/game-timings")).data.find(
                    (e) => "memory" === e.game
                  );
                  if (e) {
                    let t = new Date(),
                      s = new Date(e.start),
                      a = new Date(e.end);
                    t < s ? N("upcoming") : t > a ? N("ended") : N("active");
                  } else N("active");
                } catch (e) {
                  console.error("Error checking game timing:", e), N("active");
                }
                try {
                  (await i.Z.get("/api/games/memory/sessions")).data.find(
                    (t) => t.playerEmail === e && !0 === t.completed
                  ) && b(!0);
                } catch (e) {
                  console.error("Error checking game status:", e);
                }
                y(!1), h(!1);
              } else w.push("/");
            })();
          }, [w]),
          m || f)
        )
          return (0, a.jsx)("div", {
            className:
              "min-h-screen flex items-center justify-center bg-gray-50",
            children: (0, a.jsxs)("div", {
              className: "text-center",
              children: [
                (0, a.jsx)("div", {
                  className:
                    "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4",
                }),
                (0, a.jsx)("p", {
                  className: "text-gray-600",
                  children: "Loading Memory Game...",
                }),
              ],
            }),
          });
        if (!e || !s) return null;
        if ("upcoming" === j || "ended" === j) {
          let e = (0, g.S)(s);
          return (0, a.jsx)("div", {
            className:
              "min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4",
            children: (0, a.jsx)("div", {
              className: "max-w-2xl mx-auto",
              children: (0, a.jsxs)("div", {
                className: "bg-white rounded-2xl shadow-2xl p-8 text-center",
                children: [
                  (0, a.jsx)("div", {
                    className: "text-6xl mb-4",
                    children: "upcoming" === j ? "\uD83D\uDD12" : "⏰",
                  }),
                  (0, a.jsx)("h1", {
                    className: "text-3xl font-bold text-gray-900 mb-4",
                    children:
                      "upcoming" === j
                        ? "Game Not Started Yet"
                        : "Game Has Ended",
                  }),
                  (0, a.jsx)("p", {
                    className: "text-gray-600 mb-6",
                    children:
                      "upcoming" === j
                        ? "This game hasn't started yet. Please check back when the game opens!"
                        : "This game has ended and is no longer accepting submissions.",
                  }),
                  e &&
                    (0, a.jsx)("div", {
                      className: "p-4 rounded-lg "
                        .concat(e.bgColor, " ")
                        .concat(e.borderColor, " border-2 mb-6"),
                      children: (0, a.jsxs)("div", {
                        className: "flex items-center justify-center gap-3",
                        children: [
                          (0, a.jsx)(o.default, {
                            src: e.logo,
                            alt: e.name,
                            width: 56,
                            height: 56,
                            className: "rounded-lg",
                          }),
                          (0, a.jsxs)("div", {
                            children: [
                              (0, a.jsx)("p", {
                                className: "text-sm text-gray-600",
                                children: "Playing for",
                              }),
                              (0, a.jsxs)("p", {
                                className: "text-xl font-bold ".concat(e.color),
                                children: [e.name, " House"],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  (0, a.jsx)("div", {
                    className: "space-y-3",
                    children: (0, a.jsx)(r.default, {
                      href: "/",
                      className:
                        "block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold",
                      children: "← Back to Games",
                    }),
                  }),
                ],
              }),
            }),
          });
        }
        if (p) {
          let e = (0, g.S)(s);
          return (0, a.jsx)("div", {
            className:
              "min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4",
            children: (0, a.jsx)("div", {
              className: "max-w-2xl mx-auto",
              children: (0, a.jsxs)("div", {
                className: "bg-white rounded-2xl shadow-2xl p-8 text-center",
                children: [
                  (0, a.jsx)("div", {
                    className: "text-6xl mb-4",
                    children: "\uD83C\uDFAE",
                  }),
                  (0, a.jsx)("h1", {
                    className: "text-3xl font-bold text-gray-900 mb-4",
                    children: "You've Already Played!",
                  }),
                  (0, a.jsx)("p", {
                    className: "text-gray-600 mb-6",
                    children:
                      "You've already completed the Memory game. Each player can only play once to keep the competition fair!",
                  }),
                  e &&
                    (0, a.jsx)("div", {
                      className: "p-4 rounded-lg "
                        .concat(e.bgColor, " ")
                        .concat(e.borderColor, " border-2 mb-6"),
                      children: (0, a.jsxs)("div", {
                        className: "flex items-center justify-center gap-3",
                        children: [
                          (0, a.jsx)(o.default, {
                            src: e.logo,
                            alt: e.name,
                            width: 56,
                            height: 56,
                            className: "rounded-lg",
                          }),
                          (0, a.jsxs)("div", {
                            children: [
                              (0, a.jsx)("p", {
                                className: "text-sm text-gray-600",
                                children: "Playing for",
                              }),
                              (0, a.jsxs)("p", {
                                className: "text-xl font-bold ".concat(e.color),
                                children: [e.name, " House"],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  (0, a.jsx)("div", {
                    className: "space-y-3",
                    children: (0, a.jsx)(r.default, {
                      href: "/",
                      className:
                        "block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold",
                      children: "← Back to Games",
                    }),
                  }),
                  (0, a.jsx)("div", {
                    className: "mt-6 pt-6 border-t border-gray-200",
                    children: (0, a.jsx)("p", {
                      className: "text-sm text-gray-500",
                      children:
                        "Your score has been recorded and contributes to your house's total points!",
                    }),
                  }),
                ],
              }),
            }),
          });
        }
        return (0, a.jsx)(x, { playerEmail: e, playerHouse: s, playerName: c });
      }
    },
    8443: function (e, t, s) {
      "use strict";
      s.d(t, {
        U7: function () {
          return l;
        },
        g0: function () {
          return o;
        },
        oP: function () {
          return n;
        },
        zN: function () {
          return r;
        },
      });
      let a = "user_otp";
      function l(e, t) {
        try {
          let s = e.toLowerCase().trim(),
            l = t.trim(),
            r = Date.now() + 72e5;
          localStorage.setItem(
            a,
            JSON.stringify({ email: s, otp: l, expiresAt: r })
          ),
            console.log("OTP stored in browser for email:", s);
        } catch (e) {
          console.error("Error storing OTP in browser:", e);
        }
      }
      function r() {
        try {
          let e = localStorage.getItem(a);
          if (!e) return null;
          let t = JSON.parse(e);
          if (Date.now() > t.expiresAt) return n(), null;
          return { email: t.email, otp: t.otp };
        } catch (e) {
          return console.error("Error getting OTP from browser:", e), n(), null;
        }
      }
      function n() {
        try {
          localStorage.removeItem(a);
        } catch (e) {
          console.error("Error removing OTP from browser:", e);
        }
      }
      function o() {
        let e = r();
        return e ? { "x-user-email": e.email, "x-otp-code": e.otp } : {};
      }
    },
    8761: function (e, t, s) {
      "use strict";
      s.d(t, {
        S: function () {
          return l;
        },
        k: function () {
          return a;
        },
      });
      let a = [
        {
          id: "akashic",
          name: "Akashic Warriors",
          emoji: "⚔️",
          logo: "/akashic_warriors.png",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-500",
        },
        {
          id: "karma",
          name: "Karma Debuggers",
          emoji: "\uD83D\uDC1B",
          logo: "/karma_debuggers.png",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-500",
        },
        {
          id: "zen",
          name: "Zen Coders",
          emoji: "\uD83E\uDDD8",
          logo: "/zen_coders.png",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-500",
        },
        {
          id: "shakti",
          name: "Shakti Compliers",
          emoji: "⚡",
          logo: "/shakti_compliers.png",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-500",
        },
      ];
      function l(e) {
        return a.find((t) => t.name === e);
      }
    },
    3145: function (e, t, s) {
      "use strict";
      s.d(t, {
        default: function () {
          return l.a;
        },
      });
      var a = s(8461),
        l = s.n(a);
    },
    9376: function (e, t, s) {
      "use strict";
      var a = s(5475);
      s.o(a, "useRouter") &&
        s.d(t, {
          useRouter: function () {
            return a.useRouter;
          },
        });
    },
    8461: function (e, t, s) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (function (e, t) {
          for (var s in t)
            Object.defineProperty(e, s, { enumerable: !0, get: t[s] });
        })(t, {
          default: function () {
            return i;
          },
          getImageProps: function () {
            return o;
          },
        });
      let a = s(7043),
        l = s(5346),
        r = s(5878),
        n = a._(s(5084));
      function o(e) {
        let { props: t } = (0, l.getImgProps)(e, {
          defaultLoader: n.default,
          imgConf: {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1,
          },
        });
        for (let [e, s] of Object.entries(t)) void 0 === s && delete t[e];
        return { props: t };
      }
      let i = r.Image;
    },
  },
  function (e) {
    e.O(0, [648, 464, 878, 971, 117, 744], function () {
      return e((e.s = 5007));
    }),
      (_N_E = e.O());
  },
]);
