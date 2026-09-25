/* =========================================================
   NOVELLOW
   SUPABASE CLIENT

   Creates the single Supabase client every module shares.
========================================================= */

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.1/+esm";

import {
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
} from "../config.js?v=__VERSION__";


export const isConfigured =
    /^https:\/\/|^http:\/\/localhost/.test(SUPABASE_URL) &&
    SUPABASE_PUBLISHABLE_KEY.length > 40;


export const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,

                // Implicit flow lets a confirmation link work even
                // when it is opened on a different device.
                flowType: "implicit",

                storageKey: "novellow-auth"
            }
        }
    );
