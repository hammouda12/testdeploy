#!/usr/bin/env python3
"""
Generate QR codes for all wallet addresses from wallet.txt
"""

import json
import os
import qrcode
from pathlib import Path

def generate_qr_code(data, output_path, size=300):
    """Generate a QR code image from data"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img = img.resize((size, size))
    img.save(output_path)
    print(f"Generated: {output_path}")

def process_wallet_data(data, output_dir, parent_key=""):
    """Recursively process wallet data structure"""
    qr_count = {}
    
    for key, value in data.items():
        if isinstance(value, dict):
            # Check if this dict has an 'address' key (it's a wallet entry)
            if 'address' in value:
                # Build the QR code data
                qr_data = value['address']
                
                # Add tag for XRP
                if 'tag' in value:
                    qr_data = f"{qr_data}?tag={value['tag']}"
                
                # Add memo for EOS
                if 'memo' in value:
                    qr_data = f"{qr_data}?memo={value['memo']}"
                
                # Generate filename
                if parent_key:
                    filename = f"{parent_key.lower()}-{key.lower()}.png"
                else:
                    filename = f"{key.lower()}.png"
                
                # Handle duplicate filenames
                if filename in qr_count:
                    qr_count[filename] += 1
                    base_name = filename.replace('.png', '')
                    filename = f"{base_name}-{qr_count[filename]}.png"
                else:
                    qr_count[filename] = 0
                
                output_path = os.path.join(output_dir, filename)
                generate_qr_code(qr_data, output_path)
            else:
                # Nested structure (like ETH -> ETH, BSC)
                process_wallet_data(value, output_dir, key)
    
    return qr_count

def main():
    # Get the script directory
    script_dir = Path(__file__).parent
    wallet_file = script_dir / "public" / "wallet.txt"
    output_dir = script_dir / "public" / "qrCodes"
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Read wallet data
    print(f"Reading wallet data from: {wallet_file}")
    with open(wallet_file, 'r', encoding='utf-8') as f:
        wallet_data = json.load(f)
    
    print(f"Generating QR codes in: {output_dir}")
    print("-" * 50)
    
    # Process and generate QR codes
    process_wallet_data(wallet_data, str(output_dir))
    
    print("-" * 50)
    print("QR code generation complete!")

if __name__ == "__main__":
    main()

