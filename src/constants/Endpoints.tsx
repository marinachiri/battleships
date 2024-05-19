const BaseUrl = "http://163.172.177.98:8081"

export const Endpoints = {
    Register: BaseUrl + "/auth/register",
    Login: BaseUrl + "/auth/login",
    GetUserDetails: BaseUrl + "/user/details/me",

    /**
     * Get all games
     */
    GetGames: BaseUrl + "/game",
    CreateGame: BaseUrl + "/game",
    /**
     * Replace + with Id
     */
    JoinGame: BaseUrl + "/game/join/+",
    /**
     * Replace + with Id
     */
    GetGameDetails: "game/+",
    /**
     * Replace + with Id
     */
    SendMapConfig: "game/+",
    /**
     * Replace + with Id
     */
    Strike: "/game/+/strike"
} as const