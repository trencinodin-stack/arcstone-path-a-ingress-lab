use std::env;
use std::io::{self, Read};

use arcstone_continuity_core::lifecycle::evaluate_frame_bounds;
use arcstone_continuity_core::{Micros, PosixSignal};

fn signal_name(signal: PosixSignal) -> &'static str {
    match signal {
        PosixSignal::Pass => "PASS",
        PosixSignal::LedgerCorruption => "LEDGER_CORRUPTION",
        PosixSignal::Refusal => "REFUSAL",
        PosixSignal::Freeze => "FREEZE",
        PosixSignal::SecurityBreach => "SECURITY_BREACH",
    }
}

fn parse_elapsed_us() -> Result<u64, String> {
    let mut args = env::args().skip(1);
    while let Some(arg) = args.next() {
        if arg == "--elapsed-us" {
            let value = args.next().ok_or("missing value for --elapsed-us")?;
            return value
                .parse::<u64>()
                .map_err(|_| "invalid --elapsed-us value".to_string());
        }
    }
    Err("usage: arcstone-path-a-bridge --elapsed-us <u64> (raw payload bytes on stdin)".to_string())
}

fn main() {
    let elapsed_us = match parse_elapsed_us() {
        Ok(value) => value,
        Err(message) => {
            eprintln!("{message}");
            std::process::exit(2);
        }
    };

    let mut payload = Vec::new();
    if let Err(error) = io::stdin().read_to_end(&mut payload) {
        eprintln!("failed to read stdin: {error}");
        std::process::exit(2);
    }

    let signal = evaluate_frame_bounds(&payload, Micros(elapsed_us));
    let code = signal as u8;

    println!(
        "{{\"signal\":\"{}\",\"code\":{},\"payloadBytes\":{},\"elapsedUs\":{}}}",
        signal_name(signal),
        code,
        payload.len(),
        elapsed_us
    );
}
